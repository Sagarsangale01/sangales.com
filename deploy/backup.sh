#!/bin/bash
# Sangales.com - Automated Daily Database & Store Backup Script
set -e

BACKUP_DIR="/var/backups/sangales"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
STORE_PATH="/var/www/sangales/.data"

mkdir -p "$BACKUP_DIR"

if [ -d "$STORE_PATH" ]; then
    tar -czf "$BACKUP_DIR/sangales_data_$TIMESTAMP.tar.gz" -C /var/www/sangales .data
    echo "Backup completed: $BACKUP_DIR/sangales_data_$TIMESTAMP.tar.gz"
    
    # Keep only the last 30 daily backups
    find "$BACKUP_DIR" -type f -name "sangales_data_*.tar.gz" -mtime +30 -exec rm {} \;
else
    echo "Warning: Store directory $STORE_PATH not found."
fi

