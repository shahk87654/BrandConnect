# RDS PostgreSQL Database
resource "aws_db_instance" "main" {
  count                  = var.environment != "dev" ? 1 : 0
  allocated_storage      = 100
  storage_type           = "gp3"
  engine                 = "postgres"
  engine_version         = "15.3"
  instance_class         = var.database_instance_class
  db_name                = "brandconnect"
  username               = "postgres"
  password               = random_password.db_password.result
  parameter_group_name   = aws_db_parameter_group.main.name
  skip_final_snapshot    = var.environment == "dev"
  multi_az               = var.environment == "prod"
  publicly_accessible    = false
  vpc_security_group_ids = [aws_security_group.rds.id]
  db_subnet_group_name   = aws_db_subnet_group.main.name
  backup_retention_period = var.environment == "prod" ? 30 : 7
  backup_window          = "03:00-04:00"
  maintenance_window     = "mon:04:00-mon:05:00"
  
  tags = {
    Name = "${var.project_name}-rds"
  }
}

resource "aws_db_subnet_group" "main" {
  name       = "${var.project_name}-db-subnet-group"
  subnet_ids = aws_subnet.private[*].id

  tags = {
    Name = "${var.project_name}-db-subnet-group"
  }
}

resource "aws_db_parameter_group" "main" {
  name   = "${var.project_name}-db-params"
  family = "postgres15"

  parameter {
    name  = "log_connections"
    value = "1"
  }

  parameter {
    name  = "log_disconnections"
    value = "1"
  }

  tags = {
    Name = "${var.project_name}-db-params"
  }
}

resource "random_password" "db_password" {
  length  = 32
  special = true
}

# ElastiCache Redis
resource "aws_elasticache_cluster" "main" {
  count              = var.environment != "dev" ? 1 : 0
  cluster_id         = "${var.project_name}-redis"
  engine             = "redis"
  node_type          = "cache.t3.micro"
  num_cache_nodes    = var.environment == "prod" ? 3 : 1
  parameter_group_name = aws_elasticache_parameter_group.main.name
  engine_version     = "7.0"
  port               = 6379
  subnet_group_name  = aws_elasticache_subnet_group.main.name
  security_group_ids = [aws_security_group.redis.id]
  automatic_failover_enabled = var.environment == "prod"

  tags = {
    Name = "${var.project_name}-redis"
  }
}

resource "aws_elasticache_subnet_group" "main" {
  name       = "${var.project_name}-redis-subnet-group"
  subnet_ids = aws_subnet.private[*].id
}

resource "aws_elasticache_parameter_group" "main" {
  name   = "${var.project_name}-redis-params"
  family = "redis7"

  parameter {
    name  = "maxmemory-policy"
    value = "allkeys-lru"
  }
}

resource "aws_security_group" "redis" {
  name        = "${var.project_name}-redis-sg"
  description = "Security group for Redis"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port       = 6379
    to_port         = 6379
    protocol        = "tcp"
    security_groups = [aws_security_group.eks.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project_name}-redis-sg"
  }
}

# S3 Bucket for file storage
resource "aws_s3_bucket" "main" {
  count  = var.environment != "dev" ? 1 : 0
  bucket = "${var.project_name}-storage-${var.environment}"

  tags = {
    Name = "${var.project_name}-storage"
  }
}

resource "aws_s3_bucket_versioning" "main" {
  count  = var.environment != "dev" ? 1 : 0
  bucket = aws_s3_bucket.main[0].id
  
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "main" {
  count  = var.environment != "dev" ? 1 : 0
  bucket = aws_s3_bucket.main[0].id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "main" {
  count  = var.environment != "dev" ? 1 : 0
  bucket = aws_s3_bucket.main[0].id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
