# Showtime 用户使用手册

## 简介
Showtime 是一个开源的屏幕共享工具，专为开发者设计。它提供了简单、安全、高效的屏幕共享解决方案。

## 系统要求
- Windows 10/11 (x64 或 ARM64)
- macOS 10.15 或更高版本
- Linux (主流发行版)

## 安装说明

### Windows 用户
1. 下载对应架构的发布包：
   - x64 系统：`showtime-windows-x64.zip`
   - ARM64 系统：`showtime-windows-arm64.zip`

2. 解压下载的文件到任意目录

3. 运行 `start.bat` 启动程序

### macOS 用户
1. 下载 `showtime-macos.zip`
2. 解压下载的文件
3. 在终端中运行：
   ```bash
   ./showtime serve
   ```

### Linux 用户
1. 下载对应架构的发布包
2. 解压下载的文件
3. 运行：
   ```bash
   ./showtime serve
   ```

## 配置说明

### 基本配置
配置文件位于程序目录下的 `showtime.config` 文件中。主要配置项包括：

```ini
# 基本配置
SHOWTIME_EXTERNAL_IP=你的IP地址
SHOWTIME_HOST=你的IP地址:5050

# TLS 配置
SHOWTIME_TLS=true
SHOWTIME_TLS_CERT_FILE=./certs/server.crt
SHOWTIME_TLS_KEY_FILE=./certs/server.key

# TURN/STUN 配置
SHOWTIME_TURN_PUBLIC_IP=你的IP地址
SHOWTIME_TURN_PORT_RANGE=50000:50100

# 其他配置
SHOWTIME_TRUST_PROXY_HEADERS=true
SHOWTIME_LOG_LEVEL=debug
```

### 重要配置项说明
1. `SHOWTIME_EXTERNAL_IP`：服务器的公网 IP 地址
2. `SHOWTIME_TLS`：是否启用 TLS 加密
3. `SHOWTIME_TURN_PORT_RANGE`：TURN 服务器端口范围
4. `SHOWTIME_LOG_LEVEL`：日志级别（debug/info/warn/error）

## 使用说明

### 启动服务器
1. Windows：双击 `start.bat`
2. macOS/Linux：在终端中运行 `./showtime serve`

### 访问界面
1. 打开浏览器访问：`https://你的IP地址:5050`
2. 首次访问时需要在浏览器中接受自签名证书

### 创建房间
1. 点击"创建房间"按钮
2. 设置房间名称和密码（可选）
3. 点击"创建"按钮

### 加入房间
1. 输入房间名称
2. 输入房间密码（如果有）
3. 点击"加入"按钮

### 共享屏幕
1. 在房间内点击"开始共享"按钮
2. 选择要共享的窗口或整个屏幕
3. 点击"共享"按钮

### 停止共享
1. 点击"停止共享"按钮
2. 或关闭共享窗口

## 常见问题

### 1. 无法访问服务器
- 检查防火墙设置
- 确认端口 5050 和 3478 是否开放
- 验证 IP 地址配置是否正确

### 2. 屏幕共享失败
- 检查浏览器权限设置
- 确认 TURN 服务器配置正确
- 检查网络连接是否稳定

### 3. 证书错误
- 首次访问时需要在浏览器中接受自签名证书
- 或使用有效的 SSL 证书替换默认证书

## 安全建议
1. 使用强密码保护房间
2. 定期更新到最新版本
3. 使用 TLS 加密连接
4. 配置适当的防火墙规则

## 获取帮助
- 查看[官方文档](https://github.com/showtime/server/wiki)
- 在 [GitHub Issues](https://github.com/showtime/server/issues) 上报告问题
- 加入社区讨论

## 更新日志
查看 [CHANGELOG.md](../CHANGELOG.md) 了解最新更新内容。 