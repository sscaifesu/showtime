# 更新日志

## [Unreleased]

### 变更
- 项目从 Screego 重命名为 Showtime

### 修改内容
1. 源代码修改：
   - 更新 `go.mod` 中的模块名和依赖
   - 修改所有源代码文件中的包引用路径，从 `github.com/screego/server` 改为 `github.com/showtime/server`
   - 修复 Prometheus 指标名称（`sessionCreatedTotal` -> `sessionsCreatedTotal`）

2. 配置文件修改：
   - 将 `screego.config.development.local` 重命名为 `showtime.config.development.local`
   - 更新配置文件中的所有环境变量前缀，从 `SCREEGO_` 改为 `SHOWTIME_`
   - 修改配置文件路径（`/etc/screego/` -> `/etc/showtime/`）

3. 配置代码修改：
   - 更新 `config/config.go` 中的配置前缀
   - 更新配置文件搜索路径
   - 更新所有配置相关的错误消息和环境变量名

### 环境变量变更
所有环境变量前缀从 `SCREEGO_` 改为 `SHOWTIME_`，例如：
- `SCREEGO_EXTERNAL_IP` -> `SHOWTIME_EXTERNAL_IP`
- `SCREEGO_TLS` -> `SHOWTIME_TLS`
- `SCREEGO_TURN_PORT_RANGE` -> `SHOWTIME_TURN_PORT_RANGE`
等等...

### 配置文件变更
- 配置文件名称从 `screego.config.*` 改为 `showtime.config.*`
- 配置文件路径从 `/etc/screego/` 改为 `/etc/showtime/`
- 用户配置目录从 `~/.config/screego/` 改为 `~/.config/showtime/`

### 注意事项
1. 升级时需要重命名配置文件
2. 需要更新所有环境变量
3. 需要更新所有相关的文档和说明
4. 需要更新所有相关的部署脚本和配置

### 后续工作
1. 更新项目文档
2. 更新 Docker 镜像
3. 更新 CI/CD 配置
4. 更新示例配置
5. 更新用户指南 