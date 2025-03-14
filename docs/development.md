# 开发指南

Showtime 需要：

* Go >= 1.21
* Node >= 18
* Yarn

## 环境设置

从 git 克隆 sscaifesu/showtime 源代码：

```bash
$ git clone https://github.com/sscaifesu/showtime.git && cd showtime
```

安装前端依赖：

```bash
$ (cd ui && yarn)
```

## 启动服务器

启动前端开发服务器：

```bash
$ (cd ui && yarn dev)
```

在 showtime 文件夹中创建一个名为 `showtime.config.development.local` 的文件，内容如下：

```ini
SHOWTIME_EXTERNAL_IP=您的IP地址
```

启动后端开发服务器：

```bash
$ go run main.go serve
```

## 构建

构建前端：

```bash
$ (cd ui && yarn build)
```

构建后端：

```bash
$ go build -ldflags "-X main.version=$(git describe --tags HEAD) -X main.mode=prod" -o showtime ./main.go
```

## 代码检查

Showtime 使用 [golangci-lint](https://github.com/golangci/golangci-lint) 进行代码检查。

安装 golangci-lint：

参见 [golangci-lint 安装说明](https://github.com/golangci/golangci-lint#install)。

运行代码检查：

```bash
$ golangci-lint run
```
