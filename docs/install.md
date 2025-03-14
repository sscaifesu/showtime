# 安装说明

在启动 Showtime 之前，您可以阅读[配置说明](config.md)。

!> Showtime 需要 TLS 才能正常工作。您可以在 Showtime 内部启用 TLS，或者使用反向代理通过 TLS 提供 Showtime 服务。

## Docker 安装

使用 Docker 设置 Showtime 非常简单，您只需启动 Docker 容器即可：

可用镜像：
[ghcr.io/sscaifesu/showtime](https://github.com/orgs/sscaifesu/packages/container/package/showtime) 和
[sscaifesu/showtime](https://hub.docker.com/r/sscaifesu/showtime)

### 网络主机模式

默认情况下，Showtime 运行在 5050 端口。

```bash
$ docker run --net=host -e SHOWTIME_EXTERNAL_IP=外部IP地址 ghcr.io/sscaifesu/showtime:版本号
```

### Docker Compose 配置

```yaml
version: "3.7"
services:
  showtime:
    image: ghcr.io/sscaifesu/showtime:版本号
    network_mode: host
    environment:
      SHOWTIME_EXTERNAL_IP: "外部IP地址"
```

### 标准端口绑定

!> 使用标准端口绑定时，TURN 服务器需要同时设置内部和外部端口。

```bash
$ docker run \
    -p 5050:5050 \
    -p 3478:3478 \
    -p 50000-50100:50000-50100/udp \
    -e SHOWTIME_EXTERNAL_IP=外部IP地址 \
    -e SHOWTIME_TURN_PORT_RANGE=50000:50100 \
    ghcr.io/sscaifesu/showtime:版本号
```

### Docker Compose 配置（标准端口绑定）

```yaml
version: "3.7"
services:
  showtime:
    image: ghcr.io/sscaifesu/showtime:版本号
    ports:
      - 5050:5050
      - 3478:3478
      - 50000-50100:50000-50100/udp
    environment:
      SHOWTIME_EXTERNAL_IP: "外部IP地址"
      SHOWTIME_TURN_PORT_RANGE: 50000:50100
```

## 二进制文件安装

### 支持的平台：

- linux_amd64 (64位)
- linux_i386 (32位)
- armv7 (32位，用于树莓派)
- armv6
- arm64 (ARMv8)
- ppc64
- ppc64le
- windows_i386.exe (32位)
- windows_amd64.exe (64位)

从 [sscaifesu/showtime Releases](https://github.com/sscaifesu/showtime/releases) 下载适合您平台的压缩包。

```bash
$ wget https://github.com/sscaifesu/showtime/releases/download/v版本号/showtime_版本号_{平台}.tar.gz
```

解压缩文件：

```bash
$ tar xvf showtime_版本号_{平台}.tar.gz
```

使二进制文件可执行（仅限 Linux）：

```bash
$ chmod +x showtime
```

执行 showtime：

```bash
$ ./showtime serve
# 在 Windows 上
$ showtime.exe serve
```

## Arch-Linux(aur)

!> AUR 软件包的维护不由 Showtime 团队执行。
   在安装 AUR 软件包之前，您应该始终检查 PKGBUILD。

Showtime 的最新版本在 AUR 中可用，包名为 [showtime-server](https://aur.archlinux.org/packages/showtime-server/) 和 [showtime-server-bin](https://aur.archlinux.org/packages/showtime-server-bin/)。
开发版本可以通过 [showtime-server-git](https://aur.archlinux.org/packages/showtime-server-git/) 安装。

## FreeBSD

!> FreeBSD 软件包的维护不由 Showtime 团队执行。
   请自行检查是否可以信任它。

```bash
$ pkg install showtime
```

## 从源代码构建

[参见开发文档中的构建部分](development.md#build)
