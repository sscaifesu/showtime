# 故障排查指南

## 常见问题

### 1. 流媒体无法加载

请检查以下几点:

* 确保使用 HTTPS 访问 Screego
* 确保已正确设置 `SCREEGO_EXTERNAL_IP` 为您的外部 IP 地址。详见[配置文档](config.md)
* 如果使用 NAT 穿透,需要启用 TURN。详见[NAT 穿透文档](nat-traversal.md)
* 检查浏览器是否阻止了 WebRTC (包括扩展程序或其他设置)
* 检查防火墙是否开放了必要端口。默认需要开放 5050、3478 以及使用 TURN 时的任意 UDP 端口

### 2. 视频质量问题

如果遇到视频质量不佳:

* 在设置中尝试不同的编解码器选项:
  - "最佳质量" - 使用 VP9 编解码器获得最佳画质
  - "浏览器默认" - 使用浏览器默认编解码器
  - 也可以手动选择特定编解码器

* 检查网络带宽是否足够
* 调整帧率设置

### 3. 连接问题

如果出现连接断开或无法建立连接:

* 确保 TURN 服务器配置正确
* 检查 `SCREEGO_TURN_DENY_PEERS` 设置是否过于严格
* 验证防火墙规则是否允许 WebRTC 流量
* 检查 NAT 设置

### 4. 认证相关

* 确认 `SCREEGO_AUTH_MODE` 设置正确:
  - `all`: 始终需要用户登录
  - `turn`: 仅 TURN 连接需要登录 
  - `none`: 无需登录

* 检查用户文件配置是否正确
* 验证反向代理配置(如果使用)

### 5. 房间管理

* 使用 URL 参数 `create=true` 可以在加入时自动创建房间
* 检查 `SCREEGO_CLOSE_ROOM_WHEN_OWNER_LEAVES` 设置
* 确认房间模式(TURN/STUN/Local)设置正确

## 日志调试

* 设置 `SCREEGO_LOG_LEVEL=debug` 获取详细日志
* 检查浏览器控制台日志
* 查看 WebRTC 连接状态

## 获取帮助

* 查看[配置文档](config.md)获取详细设置说明
* 在 [GitHub Issues](https://github.com/screego/server/issues) 上报告问题
* 提供问题复现步骤和相关日志
