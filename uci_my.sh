uci add mwan3 interface
uci set mwan3.@interface[-1].name='wan'
uci set mwan3.@interface[-1].enabled='1'
uci set mwan3.@interface[-1].family='ipv4'
uci add_list mwan3.@interface[-1].track_ip='8.8.8.8'
uci set mwan3.@interface[-1].reliability='1'
uci set mwan3.@interface[-1].interval='5'
uci set mwan3.@interface[-1].timeout='2'
uci set mwan3.@interface[-1].count='2'

uci add mwan3 interface
uci set mwan3.@interface[-1].name='wan2'
uci set mwan3.@interface[-1].enabled='1'
uci set mwan3.@interface[-1].family='ipv4'
uci add_list mwan3.@interface[-1].track_ip='1.1.1.1'
uci set mwan3.@interface[-1].reliability='1'
uci set mwan3.@interface[-1].interval='5'
uci set mwan3.@interface[-1].timeout='2'
uci set mwan3.@interface[-1].count='2'

uci add mwan3 member
uci set mwan3.@member[-1].name='slt'
uci set mwan3.@member[-1].interface='wan'
uci set mwan3.@member[-1].metric='1'
uci set mwan3.@member[-1].weight='1'

uci add mwan3 member
uci set mwan3.@member[-1].name='starlink'
uci set mwan3.@member[-1].interface='wan2'
uci set mwan3.@member[-1].metric='2'
uci set mwan3.@member[-1].weight='1'

uci add mwan3 policy
uci set mwan3.@policy[-1].name='failover'
uci add_list mwan3.@policy[-1].use_member='slt'
uci add_list mwan3.@policy[-1].use_member='starlink'

uci add mwan3 rule
uci set mwan3.@rule[-1].name='default'
uci set mwan3.@rule[-1].dest_ip='0.0.0.0/0'
uci set mwan3.@rule[-1].use_policy='failover'

uci commit mwan3
