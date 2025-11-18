Write-Host "Checking for PostgreSQL installation..." -ForegroundColor Yellow

# Check if psql is available
$psqlPath = "C:\Program Files\PostgreSQL\15\bin\psql.exe"

if (Test-Path $psqlPath) {
    Write-Host "PostgreSQL is already installed!" -ForegroundColor Green
    Write-Host "To complete setup, run:" -ForegroundColor Cyan
    Write-Host "  cd backend" -ForegroundColor Gray
    Write-Host "  npm run start" -ForegroundColor Gray
} else {
    Write-Host "PostgreSQL not found. Please download and install:" -ForegroundColor Yellow
    Write-Host "  https://www.postgresql.org/download/windows/" -ForegroundColor Cyan
    Write-Host "" -ForegroundColor Yellow
    Write-Host "Installation steps:" -ForegroundColor Green
    Write-Host "  1. Download PostgreSQL 15+ installer" -ForegroundColor Gray
    Write-Host "  2. Run installer with these settings:" -ForegroundColor Gray
    Write-Host "     - Port: 5432" -ForegroundColor Gray
    Write-Host "     - Username: postgres" -ForegroundColor Gray
    Write-Host "     - Password: postgres" -ForegroundColor Gray
    Write-Host "  3. Complete installation" -ForegroundColor Gray
    Write-Host "  4. Run backend:" -ForegroundColor Gray
    Write-Host "     cd backend" -ForegroundColor Gray
    Write-Host "     npm run start" -ForegroundColor Gray
    Write-Host "" -ForegroundColor Yellow
    Write-Host "Once PostgreSQL is installed, sample data will be auto-seeded:" -ForegroundColor Green
    Write-Host "  - Admin: admin@brandconnect.local / admin@123" -ForegroundColor Cyan
    Write-Host "  - Influencer: influencer@brandconnect.local / user@123" -ForegroundColor Cyan
    Write-Host "  - Brand: brand@brandconnect.local / brand@123" -ForegroundColor Cyan
}
