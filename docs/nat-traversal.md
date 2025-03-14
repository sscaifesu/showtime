# NAT 穿透

在大多数情况下，对等点无法直接相互通信，因为防火墙或其他限制（如 NAT）。
为了解决这个问题，WebRTC 使用了 
[交互式连接建立 (ICE)](http://en.wikipedia.org/wiki/Interactive_Connectivity_Establishment)。
这是一个帮助连接对等点的框架。

ICE 使用 STUN 和/或 TURN 服务器来实现这一目标。

?> Showtime 提供了 STUN 和 TURN 服务器。您不需要单独配置这些服务器。
   默认情况下，使用 TURN 需要用户认证。

## STUN

[NAT 的会话穿越实用程序 (STUN)](http://en.wikipedia.org/wiki/STUN) 用于查找
对等点的公共/外部 IP 地址。这个 IP 地址随后会发送给其他对等点，以创建直接连接。

当使用 STUN 时，只有连接建立会通过 Showtime 进行。实际的视频流将
直接发送到其他对等点，不会经过 Showtime。

虽然 STUN 在大多数情况下应该有效，但对于更严格的 NAT，例如
[对称 NAT](https://en.wikipedia.org/wiki/Network_address_translation)，
STUN 可能无效，这时就需要使用 TURN。

## TURN

[NAT 周围的中继穿越 (TURN)](http://en.wikipedia.org/wiki/TURN) 用于绕过对称 NAT。
它通过 TURN 服务器中继所有数据来实现这一点。由于中继会在服务器上产生流量，
Showtime 要求用户认证才能使用 TURN 服务器。这可以通过配置来设置，参见[配置说明](config.md)。

