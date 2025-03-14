# Showtime 开发者手册

## 开发环境要求
- Go 1.21 或更高版本
- Node.js 18 或更高版本
- Yarn 1.22 或更高版本
- golangci-lint（用于代码检查）

## 项目结构
```
showtime/
├── main.go              # 主程序入口
├── config/             # 配置相关代码
├── router/             # HTTP 路由处理
├── turn/               # TURN/STUN 服务器实现
├── ws/                 # WebSocket 相关代码
├── ui/                 # 前端界面代码
├── docs/               # 文档
└── showtime-windows/   # Windows 相关文件
```

## 开发环境设置

### 1. 克隆仓库
```bash
git clone https://github.com/showtime/server.git
cd server
```

### 2. 安装依赖
```bash
# 安装前端依赖
cd ui
yarn install

# 安装 Go 依赖
cd ..
go mod download
```

### 3. 安装开发工具
```bash
# 安装 golangci-lint
go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest
```

## 开发流程

### 1. 启动开发服务器
```bash
# 启动前端开发服务器
cd ui
yarn dev

# 启动后端服务器（新终端）
cd ..
go run main.go serve
```

### 2. 构建项目
```bash
# 构建前端
cd ui
yarn build

# 构建后端
cd ..
go build -o showtime main.go
```

### 3. 代码检查
```bash
# 运行 linter
golangci-lint run

# 运行测试
go test ./...
```

## 代码规范

### Go 代码规范
1. 遵循 [Go 官方代码规范](https://golang.org/doc/effective_go)
2. 使用 `golangci-lint` 进行代码检查
3. 所有公共函数和类型都需要添加注释
4. 错误处理必须明确且有意义

### 前端代码规范
1. 使用 TypeScript 进行开发
2. 遵循 ESLint 规则
3. 组件使用函数式组件
4. 使用 CSS Modules 进行样式管理

## 配置开发

### 开发环境配置
创建 `showtime.config.development.local` 文件：
```ini
SHOWTIME_EXTERNAL_IP=127.0.0.1
SHOWTIME_HOST=127.0.0.1:5050
SHOWTIME_TLS=false
SHOWTIME_TURN_PUBLIC_IP=127.0.0.1
SHOWTIME_TURN_PORT_RANGE=50000:50100
SHOWTIME_TRUST_PROXY_HEADERS=true
SHOWTIME_LOG_LEVEL=debug
```

### 调试配置
1. 使用 `SHOWTIME_LOG_LEVEL=debug` 启用详细日志
2. 使用 `SHOWTIME_TLS=false` 禁用 TLS 进行本地开发
3. 使用 `SHOWTIME_TRUST_PROXY_HEADERS=true` 信任代理头

## 测试

### 单元测试
```bash
# 运行所有测试
go test ./...

# 运行特定包的测试
go test ./config

# 运行带覆盖率的测试
go test -cover ./...
```

### 集成测试
1. 启动本地服务器
2. 使用测试客户端连接
3. 验证功能是否正常

## 发布流程

### 1. 版本号管理
- 遵循语义化版本控制
- 在 `CHANGELOG.md` 中记录变更

### 2. 构建发布包
```bash
# 构建所有平台
GOOS=windows GOARCH=amd64 go build -o showtime.exe main.go
GOOS=windows GOARCH=arm64 go build -o showtime_arm64.exe main.go
GOOS=darwin GOARCH=amd64 go build -o showtime main.go
GOOS=linux GOARCH=amd64 go build -o showtime main.go
```

### 3. 打包发布
1. 创建发布包目录结构
2. 复制必要文件
3. 生成发布包

## 贡献指南

### 1. 提交代码
1. Fork 项目
2. 创建特性分支
3. 提交更改
4. 创建 Pull Request

### 2. 代码审查
- 确保代码符合规范
- 添加必要的测试
- 更新文档
- 更新 CHANGELOG.md

### 3. 发布流程
1. 更新版本号
2. 更新 CHANGELOG.md
3. 创建发布标签
4. 构建发布包
5. 发布到 GitHub Releases

## 常见问题

### 1. 开发环境问题
- 确保所有依赖版本正确
- 检查环境变量设置
- 验证配置文件

### 2. 构建问题
- 检查 Go 版本
- 验证依赖完整性
- 检查构建参数

### 3. 测试问题
- 确保测试环境正确
- 检查测试数据
- 验证测试覆盖率

## 获取帮助
- 查看 [GitHub Issues](https://github.com/showtime/server/issues)
- 加入开发者社区
- 参考 [Go 官方文档](https://golang.org/doc/) 