# BrandConnect Database Setup Guide

## Current Status
- ✅ Frontend: Running on http://localhost:3000
- ✅ Backend: Running on http://localhost:3001 (waiting for database)
- ⏳ Database: PostgreSQL connection needed

## Option 1: PostgreSQL via Windows Installer (Recommended for Local Dev)

### Prerequisites
- Download PostgreSQL 15+ from https://www.postgresql.org/download/windows/

### Installation Steps

1. **Download & Install PostgreSQL**
   - Visit https://www.postgresql.org/download/windows/
   - Download PostgreSQL 15+ installer
   - During installation:
     - Port: `5432`
     - Username: `postgres`
     - Password: `postgres` (or your choice)
     - Install pgAdmin (optional, useful for GUI management)

2. **Verify Installation**
   ```powershell
   psql -U postgres -c "SELECT version();"
   ```

3. **Create BrandConnect Database**
   ```powershell
   psql -U postgres -c "CREATE DATABASE brandconnect;"
   ```

4. **Verify Database Created**
   ```powershell
   psql -U postgres -c "\l" | findstr "brandconnect"
   ```

5. **Backend will auto-create tables** (via TypeORM synchronize: true)
   - Once database exists, restart backend: `npm run start:dev`
   - TypeORM will auto-generate all tables from entities

## Option 2: PostgreSQL via WSL2 + Docker (Advanced)

### Prerequisites
- Windows 10/11 Pro or higher
- WSL2 installed and enabled
- Docker Desktop for Windows with WSL2 integration

### Steps
```bash
docker run -d \
  --name brandconnect-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=brandconnect \
  -p 5432:5432 \
  postgres:15-alpine
```

## Option 3: PostgreSQL via Azure Data Studio (GUI)

1. Install Azure Data Studio (free tool from Microsoft)
2. Create new connection to PostgreSQL server
3. Create database `brandconnect`
4. Restart backend

## Connection Verification

Once PostgreSQL is running, test the connection:

```powershell
# From backend directory
npm run start:dev
```

Expected output when connected:
```
[Nest] #### - ## - ##, ## PM   LOG [TypeOrmModule] Database connected successfully
[Nest] #### - ## - ##, ## PM   LOG [NestFactory] Starting Nest application...
```

## Database Management Commands

```powershell
# Once PostgreSQL is running, you can use these commands:

# Run migrations (if any exist)
npm run migration:run

# Generate migration from entities
npm run migration:generate -- --name InitialSchema

# Seed database with sample data
npm run seed

# View database contents (using psql)
psql -U postgres -d brandconnect

# Inside psql prompt:
\dt                    # List all tables
\d users               # Describe users table
SELECT * FROM users;   # View users table
\q                     # Quit psql
```

## Troubleshooting

### "Unable to connect to the database. Retrying..."
- PostgreSQL service is not running
- Verify: `psql -U postgres -c "SELECT 1;"`
- Fix: Start PostgreSQL service (via Services app on Windows)

### "FATAL: password authentication failed"
- Wrong password in `.env.local`
- Check DATABASE_PASSWORD matches your PostgreSQL setup
- Reset password: `ALTER USER postgres WITH PASSWORD 'postgres';` (in psql)

### "database 'brandconnect' does not exist"
- Create it with: `psql -U postgres -c "CREATE DATABASE brandconnect;"`

### Backend crashes after DB connection
- Tables don't exist yet (this is normal on first run)
- Backend will create them automatically via `synchronize: true`
- Just restart: `npm run start:dev`

## Next Steps

After database is set up:

1. ✅ Database running and connected
2. TypeORM auto-creates tables from entities
3. Run optional seed script: `npm run seed`
4. Start implementing API endpoints in each module
5. Connect frontend to backend API

## Development Workflow

```powershell
# Terminal 1: PostgreSQL (if local install)
# Keep PostgreSQL running

# Terminal 2: Backend
cd backend
npm run start:dev
# Listens on http://localhost:3001
# Auto-reloads on file changes

# Terminal 3: Frontend  
cd frontend
npm run dev
# Listens on http://localhost:3000
# Auto-reloads on file changes
```

## Environment Variables

Current database config in `.env.local`:
```
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=brandconnect
```

Change these if your PostgreSQL uses different credentials.

## Useful GUI Tools

- **pgAdmin** (included with PostgreSQL) - Web UI for database management
- **Azure Data Studio** - Free, lightweight database IDE
- **DBeaver** - Comprehensive database tool
- **psql** - Command-line tool (comes with PostgreSQL)
