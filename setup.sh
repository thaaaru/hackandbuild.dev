#!/bin/bash

# OpenVPN + Dante SOCKS Proxy Auto-Installer
# Compatible with Ubuntu 22.04 LTS
# Run as root: sudo bash setup.sh

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration variables - MODIFY THESE
SERVER_IP=$(curl -s ifconfig.me)
OPENVPN_PORT="1194"
DANTE_PORT="1080"
CLIENT_NAME="client1"
DNS1="8.8.8.8"
DNS2="8.8.4.4"

echo -e "${GREEN}=== OpenVPN + Dante SOCKS Proxy Installer ===${NC}"
echo -e "Server IP: ${YELLOW}$SERVER_IP${NC}"
echo -e "OpenVPN Port: ${YELLOW}$OPENVPN_PORT${NC}"
echo -e "Dante Port: ${YELLOW}$DANTE_PORT${NC}"

# Update system
echo -e "${GREEN}[1/8] Updating system...${NC}"
apt update && apt upgrade -y

# Install required packages
echo -e "${GREEN}[2/8] Installing packages...${NC}"
apt install -y openvpn easy-rsa dante-server ufw curl wget

# Setup Easy-RSA
echo -e "${GREEN}[3/8] Setting up PKI...${NC}"
make-cadir /etc/openvpn/easy-rsa
cd /etc/openvpn/easy-rsa

# Configure Easy-RSA vars
cat > vars << EOF
set_var EASYRSA_REQ_COUNTRY    "LK"
set_var EASYRSA_REQ_PROVINCE   "Western"
set_var EASYRSA_REQ_CITY       "Colombo"
set_var EASYRSA_REQ_ORG        "VPN-Server"
set_var EASYRSA_REQ_EMAIL      "admin@vpn-server.local"
set_var EASYRSA_REQ_OU         "IT"
set_var EASYRSA_KEY_SIZE       2048
set_var EASYRSA_ALGO           rsa
set_var EASYRSA_CA_EXPIRE      3650
set_var EASYRSA_CERT_EXPIRE    3650
EOF

# Generate certificates
./easyrsa init-pki
echo -e "\n" | ./easyrsa build-ca nopass
echo -e "\n" | ./easyrsa gen-req server nopass
echo -e "yes\n" | ./easyrsa sign-req server server
./easyrsa gen-dh
echo -e "\n" | ./easyrsa gen-req $CLIENT_NAME nopass
echo -e "yes\n" | ./easyrsa sign-req client $CLIENT_NAME

# Generate TLS auth key
openvpn --genkey secret pki/ta.key

# Copy certificates
cp pki/ca.crt pki/issued/server.crt pki/private/server.key pki/dh.pem pki/ta.key /etc/openvpn/

echo -e "${GREEN}[4/8] Configuring OpenVPN server...${NC}"
# Create OpenVPN server config
cat > /etc/openvpn/server.conf << EOF
port $OPENVPN_PORT
proto udp
dev tun
ca ca.crt
cert server.crt
key server.key
dh dh.pem
auth SHA512
tls-auth ta.key 0
topology subnet
server 10.8.0.0 255.255.255.0
ifconfig-pool-persist /var/log/openvpn/ipp.txt
push "redirect-gateway def1 bypass-dhcp"
push "dhcp-option DNS $DNS1"
push "dhcp-option DNS $DNS2"
keepalive 10 120
cipher AES-256-CBC
user nobody
group nogroup
persist-key
persist-tun
verb 3
explicit-exit-notify 1
EOF

# Enable IP forwarding
echo 'net.ipv4.ip_forward=1' >> /etc/sysctl.conf
sysctl -p

# Configure iptables
iptables -t nat -A POSTROUTING -s 10.8.0.0/24 -o $(ip route | grep default | awk '{print $5}') -j MASQUERADE
iptables -A INPUT -i tun0 -j ACCEPT
iptables -A FORWARD -i $(ip route | grep default | awk '{print $5}') -o tun0 -m state --state RELATED,ESTABLISHED -j ACCEPT
iptables -A FORWARD -i tun0 -o $(ip route | grep default | awk '{print $5}') -j ACCEPT

# Save iptables rules
apt install -y iptables-persistent
iptables-save > /etc/iptables/rules.v4

echo -e "${GREEN}[5/8] Configuring Dante SOCKS proxy...${NC}"
# Configure Dante
cat > /etc/danted.conf << EOF
logoutput: /var/log/socks.log
internal: 0.0.0.0 port = $DANTE_PORT
external: $(ip route | grep default | awk '{print $5}')
clientmethod: none
socksmethod: none
user.privileged: proxy
user.notprivileged: nobody

client pass {
    from: 0.0.0.0/0 to: 0.0.0.0/0
    log: error connect disconnect
}

socks pass {
    from: 0.0.0.0/0 to: 0.0.0.0/0
    log: error connect disconnect
}
EOF

echo -e "${GREEN}[6/8] Configuring firewall...${NC}"
# Configure UFW
ufw --force reset
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow $OPENVPN_PORT/udp
ufw allow $DANTE_PORT
ufw --force enable

echo -e "${GREEN}[7/8] Starting services...${NC}"
# Enable and start services
systemctl enable openvpn@server
systemctl start openvpn@server
systemctl enable danted
systemctl start danted

# Create client config directory
mkdir -p /root/client-configs

echo -e "${GREEN}[8/8] Generating client configuration...${NC}"
# Generate client config
cat > /root/client-configs/$CLIENT_NAME.ovpn << EOF
client
dev tun
proto udp
remote $SERVER_IP $OPENVPN_PORT
resolv-retry infinite
nobind
user nobody
group nogroup
persist-key
persist-tun
auth SHA512
cipher AES-256-CBC
ignore-unknown-option block-outside-dns
block-outside-dns
verb 3
<ca>
$(cat /etc/openvpn/easy-rsa/pki/ca.crt)
</ca>
<cert>
$(cat /etc/openvpn/easy-rsa/pki/issued/$CLIENT_NAME.crt)
</cert>
<key>
$(cat /etc/openvpn/easy-rsa/pki/private/$CLIENT_NAME.key)
</key>
<tls-auth>
$(cat /etc/openvpn/easy-rsa/pki/ta.key)
</tls-auth>
key-direction 1
EOF

# Create additional client script
cat > /root/add-client.sh << 'EOF'
#!/bin/bash
if [ -z "$1" ]; then
    echo "Usage: ./add-client.sh <client-name>"
    exit 1
fi

CLIENT_NAME=$1
cd /etc/openvpn/easy-rsa
echo -e "\n" | ./easyrsa gen-req $CLIENT_NAME nopass
echo -e "yes\n" | ./easyrsa sign-req client $CLIENT_NAME

SERVER_IP=$(curl -s ifconfig.me)
cat > /root/client-configs/$CLIENT_NAME.ovpn << EOL
client
dev tun
proto udp
remote $SERVER_IP 1194
resolv-retry infinite
nobind
user nobody
group nogroup
persist-key
persist-tun
auth SHA512
cipher AES-256-CBC
ignore-unknown-option block-outside-dns
block-outside-dns
verb 3
<ca>
$(cat pki/ca.crt)
</ca>
<cert>
$(cat pki/issued/$CLIENT_NAME.crt)
</cert>
<key>
$(cat pki/private/$CLIENT_NAME.key)
</key>
<tls-auth>
$(cat pki/ta.key)
</tls-auth>
key-direction 1
EOL

echo "Client config created: /root/client-configs/$CLIENT_NAME.ovpn"
EOF

chmod +x /root/add-client.sh

# Final status check
echo -e "\n${GREEN}=== Installation Complete ===${NC}"
echo -e "OpenVPN Status: ${YELLOW}$(systemctl is-active openvpn@server)${NC}"
echo -e "Dante Status: ${YELLOW}$(systemctl is-active danted)${NC}"
echo -e "\n${GREEN}Configuration Files:${NC}"
echo -e "Client Config: ${YELLOW}/root/client-configs/$CLIENT_NAME.ovpn${NC}"
echo -e "Add Client Script: ${YELLOW}/root/add-client.sh <client-name>${NC}"
echo -e "\n${GREEN}Connection Details:${NC}"
echo -e "OpenVPN: ${YELLOW}$SERVER_IP:$OPENVPN_PORT${NC}"
echo -e "SOCKS Proxy: ${YELLOW}$SERVER_IP:$DANTE_PORT${NC}"
echo -e "\n${GREEN}Next Steps:${NC}"
echo "1. Download client config from /root/client-configs/$CLIENT_NAME.ovpn"
echo "2. Import into OpenVPN client"
echo "3. Configure applications to use SOCKS proxy at $SERVER_IP:$DANTE_PORT"

# Create service status check script
cat > /root/check-status.sh << 'EOF'
#!/bin/bash
echo "=== Service Status ==="
echo "OpenVPN: $(systemctl is-active openvpn@server)"
echo "Dante: $(systemctl is-active danted)"
echo ""
echo "=== Listening Ports ==="
netstat -tulpn | grep -E ":(1194|1080)"
echo ""
echo "=== Active VPN Connections ==="
if [ -f /var/log/openvpn/ipp.txt ]; then
    cat /var/log/openvpn/ipp.txt
else
    echo "No active connections"
fi
EOF

chmod +x /root/check-status.sh

echo -e "\n${GREEN}Management Scripts Created:${NC}"
echo -e "Status Check: ${YELLOW}/root/check-status.sh${NC}"
echo -e "Add Client: ${YELLOW}/root/add-client.sh <client-name>${NC}"
