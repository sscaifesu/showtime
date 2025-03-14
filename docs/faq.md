# 常见问题解答

## 流媒体无法加载

请检查以下几点：
* 您是否使用 HTTPS 访问 Showtime。
* `SHOWTIME_EXTERNAL_IP` 是否设置为您的外部 IP 地址。参见[配置说明](config.md)
* 您是否使用 TURN 进行 NAT 穿透。参见[NAT 穿透](nat-traversal.md)。
* 您的浏览器是否阻止了 WebRTC（扩展程序或其他设置）
* 您是否在防火墙中开放了端口。默认情况下，使用 TURN 时需要开放 5050、3478 和任何 UDP 端口。

## 加入时自动创建房间

有时您想重复使用 Showtime 房间，但总是需要重新创建它。
通过在 URL 中传递 `create=true` 参数，如果房间不存在，您可以自动创建房间。

示例：https://您的域名:5050/?room=不存在的房间&create=true
