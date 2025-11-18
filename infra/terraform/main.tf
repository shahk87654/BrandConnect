terraform {
  required_version = ">= 1.0"
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Backend configuration for state management
  # Uncomment and configure for remote state
  # backend "s3" {
  #   bucket         = "brandconnect-terraform-state"
  #   key            = "prod/terraform.tfstate"
  #   region         = "eu-west-2"
  #   encrypt        = true
  #   dynamodb_table = "terraform-locks"
  # }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "BrandConnect"
      Environment = var.environment
      ManagedBy   = "Terraform"
      CreatedAt   = timestamp()
    }
  }
}

# Variables
variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "eu-west-2"
}

variable "environment" {
  description = "Environment name"
  type        = string
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be dev, staging, or prod."
  }
}

variable "project_name" {
  description = "Project name"
  type        = string
  default     = "brandconnect"
}

variable "vpc_cidr" {
  description = "VPC CIDR block"
  type        = string
  default     = "10.0.0.0/16"
}

variable "enable_nat_gateway" {
  description = "Enable NAT Gateway for private subnets"
  type        = bool
  default     = true
}

variable "database_instance_class" {
  description = "RDS instance class"
  type        = string
  default     = "db.t3.micro"
}

variable "eks_cluster_version" {
  description = "EKS cluster version"
  type        = string
  default     = "1.28"
}

variable "eks_node_desired_size" {
  description = "Desired number of EKS nodes"
  type        = number
  default     = 2
}

# Outputs
output "eks_cluster_name" {
  description = "EKS cluster name"
  value       = try(aws_eks_cluster.main[0].name, "")
}

output "eks_cluster_endpoint" {
  description = "EKS cluster endpoint"
  value       = try(aws_eks_cluster.main[0].endpoint, "")
}

output "rds_endpoint" {
  description = "RDS database endpoint"
  value       = try(aws_db_instance.main[0].endpoint, "")
}

output "redis_endpoint" {
  description = "ElastiCache Redis endpoint"
  value       = try(aws_elasticache_cluster.main[0].cache_nodes[0].address, "")
}

output "s3_bucket_name" {
  description = "S3 bucket for file storage"
  value       = try(aws_s3_bucket.main[0].id, "")
}
