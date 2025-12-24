#!/bin/sh

echo "[+] Fixing firewall zone bindings for mwan3"

# Ensure WAN zone has 'wan'
uci del_list firewall.wan.network='wan' 2>/dev/null
uci add_list firewall.wan.network='wan'
uci set firewall.wan.masq='1'
uci set firewall.wan.mtu_fix='1'

# Create WAN2 zone ONLY if missing
if ! uci get firewall.wan2 >/dev/null 2>&1; then
    uci add firewall zone
    uci set firewall.@zone[-1].name='wan2'
    uci set firewall.@zone[-1].input='REJECT'
    uci set firewall.@zone[-1].output='ACCEPT'
    uci set firewall.@zone[-1].forward='REJECT'
fi

# Bind wan2 network
uci del_list firewall.wan2.network='wan2' 2>/dev/null
uci add_list firewall.wan2.network='wan2'
uci set firewall.wan2.masq='1'
uci set firewall.wan2.mtu_fix='1'

uci commit firewall
/etc/init.d/firewall restart

echo "[✓] Firewall bindings fixed"
