#!/bin/bash

set -e  # Exit on error

echo "=== Updating Ubuntu ==="
sudo apt update
sudo apt upgrade -y

echo ""
echo "=== Installing prerequisites ==="
sudo apt install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

echo ""
echo "=== Adding Docker's official GPG key ==="
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo ""
echo "=== Setting up Docker repository ==="
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

echo ""
echo "=== Installing Docker Engine ==="
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

echo ""
echo "=== Starting and enabling Docker service ==="
sudo systemctl start docker
sudo systemctl enable docker

echo ""
echo "=== Adding current user to docker group ==="
sudo usermod -aG docker $USER

echo ""
echo "=== Docker installation complete! ==="
echo "Docker version:"
sudo docker --version
echo ""
echo "NOTE: You may need to log out and back in for docker group changes to take effect."
echo "To verify installation, run: docker run hello-world"
