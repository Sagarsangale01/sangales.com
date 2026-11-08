# Sangales.com - Windows Deployment Packaging Script
# This creates a clean deployment archive excluding node_modules, .next, and temporary files.

$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $PSScriptRoot
$zipPath = Join-Path $projectRoot "sangales-deploy.zip"

Write-Host "Packaging Sangales Corporate Portal for AWS Deployment..." -ForegroundColor Cyan

if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}

$excludeItems = @(
    "node_modules",
    ".next",
    ".git",
    "sangales-deploy.zip"
)

$filesToZip = Get-ChildItem -Path $projectRoot | Where-Object { $excludeItems -notcontains $_.Name }

Compress-Archive -Path $filesToZip.FullName -DestinationPath $zipPath -Force

$zipSize = (Get-Item $zipPath).Length / 1MB
Write-Host "Successfully created deployment archive: sangales-deploy.zip ($([math]::Round($zipSize, 2)) MB)" -ForegroundColor Green
Write-Host "You can now upload this zip file to your AWS Lightsail server." -ForegroundColor Yellow

