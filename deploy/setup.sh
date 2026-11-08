#!/bin/bash
# Sangales.com - Automated Server Setup Script for Ubuntu 22.04 / 24.04 (AWS Lightsail or EC2)
set -e

echo "======================================================"
echo "SANGALES.COM - AUTOMATED AWS PRODUCTION DEPLOYMENT"
echo "======================================================"

# 1. Update system packages
sudo apt update && sudo apt upgrade -y

# 1.1 Configure 2GB Swap Memory (ensures npm run build never runs out of memory on 1GB RAM)
if [ ! -f /swapfile ]; then
    echo "Creating 2GB swapfile..."
    sudo fallocate -l 2G /swapfile || sudo dd if=/dev/zero of=/swapfile bs=1M count=2048
    sudo chmod 600 /swapfile
    sudo mkswap /swapfile
    sudo swapon /swapfile
    echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
fi

# 2. Install essential packages
sudo apt install -y curl git ufw nginx certbot python3-certbot-nginx unzip

# 3. Install Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 4. Install PM2 process manager
sudo npm install -g pm2

# 5. Configure Firewall (UFW)
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
echo "y" | sudo ufw enable

# 6. Verify Node & PM2 installation
node -v
npm -v
pm2 -v

echo "======================================================"
echo "Server environment ready!"
echo "Next steps:"
echo "1. Upload your sangales.com project to /var/www/sangales"
echo "2. Run: npm install && npm run build"
echo "3. Run: pm2 start ecosystem.config.js && pm2 save && pm2 startup"
echo "4. Obtain SSL certificate: sudo certbot --nginx -d sangales.com -d www.sangales.com"
echo "======================================================"

