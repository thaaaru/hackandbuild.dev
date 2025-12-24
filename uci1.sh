#!/bin/sh

echo "[+] Configuring mwan3 interfaces (failover mode)"

# ---------- WAN (SLT - Primary) ----------
uci set mwan3.wan=interface
uci set mwan3.wan.enabled='1'
uci set mwan3.wan.family='ipv4'
uci set mwan3.wan.track_ip='8.8.8.8'
uci set mwan3.wan.reliability='1'
uci set mwan3.wan.count='2'
uci set mwan3.wan.timeout='2'
uci set mwan3.wan.interval='5'
uci set mwan3.wan.metric='10'
uci set mwan3.wan.weight='1'

# ---------- WAN2 (Starlink - Backup) ----------
uci set mwan3.wan2=interface
uci set mwan3.wan2.enabled='1'
uci set mwan3.wan2.family='ipv4'
uci set mwan3.wan2.track_ip='1.1.1.1'
uci set mwan3.wan2.reliability='1'
uci set mwan3.wan2.count='2'
uci set mwan3.wan2.timeout='2'
uci set mwan3.wan2.interval='5'
uci set mwan3.wan2.metric='20'
uci set mwan3.wan2.weight='1'

# ---------- Commit & Restart ----------
uci commit mwan3
/etc/init.d/mwan3 restart

echo "[✓] mwan3 interface configuration applied"
echo "[i] Run: mwan3 status"
