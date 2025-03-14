# 配置说明

!> Showtime 需要 TLS 才能正常工作。您可以在 Showtime 内部启用 TLS，或者使用反向代理通过 TLS 提供 Showtime 服务。

Showtime 尝试按顺序从不同位置获取配置值。配置属性永远不会被覆盖。因此，将使用设置的第一次出现。

#### 配置顺序

* 环境变量
* `showtime.config.local`（与二进制文件在同一路径）
* `showtime.config`（与二进制文件在同一路径）
* `$HOME/.config/showtime/server.config`
* `/etc/showtime/server.config`

#### 配置示例

```ini
# 服务器的外部 IP 地址。
# 使用双栈设置时，用逗号分隔 IPv4 和 IPv6。
# 在要托管 Showtime 的服务器上执行以下命令来查找您的外部 IP。
#   curl 'https://api.ipify.org'
# 示例：
#   SHOWTIME_EXTERNAL_IP=192.168.178.2,2a01:c22:a87c:e500:2d8:61ff:fec7:f92a
#
# 如果服务器没有静态 IP，可以通过域名获取 IP：
#   SHOWTIME_EXTERNAL_IP=dns:app.showtime.net
# 您还可以指定要使用的 DNS 服务器
#   SHOWTIME_EXTERNAL_IP=dns:app.showtime.net@9.9.9.9:53
SHOWTIME_EXTERNAL_IP=

# 一个应该是唯一的密钥。用于 cookie 认证。
SHOWTIME_SECRET=

# 是否为 HTTP 请求启用 TLS。Showtime 需要 TLS，
# 您必须启用此设置或通过反向代理提供 TLS。
SHOWTIME_SERVER_TLS=false
# TLS 证书文件（仅在启用 TLS 时需要）
SHOWTIME_TLS_CERT_FILE=
# TLS 密钥文件（仅在启用 TLS 时需要）
SHOWTIME_TLS_KEY_FILE=

# HTTP 服务器将监听的地址。
# 格式：
# - 主机:端口
#   示例：127.0.0.1:5050
# - Unix 套接字（必须以 unix: 为前缀）
#   示例：unix:/my/file/path.socket
SHOWTIME_SERVER_ADDRESS=0.0.0.0:5050

# TURN 服务器将监听的地址。
SHOWTIME_TURN_ADDRESS=0.0.0.0:3478

# 限制 TURN 用于数据中继的端口。
# 格式：最小值:最大值
# 示例：
#   50000:55000
SHOWTIME_TURN_PORT_RANGE=

# 如果设置，Showtime 将不启动 TURN 服务器，而是使用外部 TURN 服务器。
# 使用双栈设置时，用逗号分隔 IPv4 和 IPv6。
# 在托管 TURN 服务器的服务器上执行以下命令来查找您的外部 IP。
#   curl 'https://api.ipify.org'
# 示例：
#   SHOWTIME_TURN_EXTERNAL_IP=192.168.178.2,2a01:c22:a87c:e500:2d8:61ff:fec7:f92a
#
# 如果 TURN 服务器没有静态 IP，可以通过域名获取 IP：
#   SHOWTIME_TURN_EXTERNAL_IP=dns:turn.showtime.net
# 您还可以指定要使用的 DNS 服务器
#   SHOWTIME_TURN_EXTERNAL_IP=dns:turn.showtime.net@9.9.9.9:53
SHOWTIME_TURN_EXTERNAL_IP=

# 外部 TURN 服务器监听的端口。
SHOWTIME_TURN_EXTERNAL_PORT=3478

# 外部 TURN 服务器的认证密钥。
SHOWTIME_TURN_EXTERNAL_SECRET=

# 拒绝/禁止特定 CIDR 范围内的对等点，以防止 TURN 服务器用户
# 访问 TURN 服务器可以访问但互联网无法访问的机器，
# 当服务器位于 NAT 后面时很有用。
#
# 禁止内部 IP 地址：https://en.wikipedia.org/wiki/Reserved_IP_addresses
# SHOWTIME_TURN_DENY_PEERS=0.0.0.0/8,10.0.0.0/8,100.64.0.0/10,127.0.0.1/8,169.254.0.0/16,172.16.0.0/12,192.0.0.0/24,192.0.2.0/24,192.88.99.0/24,192.168.0.0/16,198.18.0.0/15,198.51.100.0/24,203.0.113.0/24,224.0.0.0/4,239.0.0.0/8,255.255.255.255/32,::/128,::1/128,64:ff9b:1::/48,100::/64,2001::/32,2002::/16,fc00::/7,fe80::/10
#
# 默认拒绝本地地址。
SHOWTIME_TURN_DENY_PEERS=0.0.0.0/8,127.0.0.1/8,::/128,::1/128,fe80::/10

# 是否信任反向代理头。
# Showtime 使用 IP 白名单进行 TURN 连接的认证。
# 当位于代理后面时，IP 始终是代理服务器的 IP。
# 为了仍然允许白名单，必须启用此设置，
# 并且反向代理必须设置 `X-Real-Ip` 头。
SHOWTIME_TRUST_PROXY_HEADERS=false

# 定义何时需要用户登录
# 可能的值：
#   all: 始终需要用户登录
#   turn: TURN 连接需要用户登录
#   none: 从不需要用户登录
SHOWTIME_AUTH_MODE=turn

# 定义允许访问 Showtime（HTTP + WebSocket）的源
# 默认值适用于大多数用例。
# 示例值：https://showtime.net,https://sub.gotify.net
SHOWTIME_CORS_ALLOWED_ORIGINS=

# 定义用户文件的位置。
# 文件格式：
#   user1:bcrypt_password_hash
#   user2:bcrypt_password_hash
#
# 示例：
#   user1:$2a$12$WEfYCnWGk0PDzbATLTNiTuoZ7e/43v6DM/h7arOnPU6qEtFG.kZQy
#
# 可以通过以下方式创建用户密码对
#   showtime hash --name "user1" --pass "your password"
SHOWTIME_USERS_FILE=

# 定义用户会话有效期（以秒为单位）。
# 0 = 浏览器会话结束后会话失效
SHOWTIME_SESSION_TIMEOUT_SECONDS=0

# 定义房间创建对话框中复选框的默认值，
# 用于选择房间所有者离开时是否关闭房间
SHOWTIME_CLOSE_ROOM_WHEN_OWNER_LEAVES=true

# 日志级别（debug、info、warn、error 之一）
SHOWTIME_LOG_LEVEL=info

# Showtime 是否应在 /metrics 暴露 Prometheus 端点。
# 该端点需要用户文件中的用户进行基本认证。
SHOWTIME_PROMETHEUS=false