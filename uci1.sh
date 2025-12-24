#!/bin/sh

echo "[+] Adding firewall zones for mwan3"

# WAN
uci set firewall.wan=zone
uci set firewall.wan.name='wan'
uci set firewall.wan.input='REJECT'
uci set firewall.wan.output='ACCEPT'
uci set firewall.wan.forward='REJECT'
uci add_list firewall.wan.network='wan'
uci set firewall.wan.masq='1'
uci set firewall.wan.mtu_fix='1'

# WAN2
uci set firewall.wan2=zone
uci set firewall.wan2.name='wan2'
uci set firewall.wan2.input='REJECT'
uci set firewall.wan2.output='ACCEPT'
uci set firewall.wan2.forward='REJECT'
uci add_list firewall.wan2.network='wan2'
uci set firewall.wan2.masq='1'
uci set firewall.wan2.mtu_fix='1'

uci commit firewall
/etc/init.d/firewall restart

echo "[✓] Firewall zones applied"
