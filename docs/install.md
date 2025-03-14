# Installation

Before starting Showtime you may read [Configuration](config.md).

!> TLS is required for Showtime to work. Either enable TLS inside Showtime or
use a reverse proxy to serve Showtime via TLS.

## Docker

Setting up Showtime with docker is pretty easy, you basically just have to start the docker container, and you are ready to go:

Available at:
[ghcr.io/showtime/server](https://github.com/orgs/showtime/packages/container/package/server) and
[showtime/server](https://hub.docker.com/r/showtime/server)

### Network Host

By default, Showtime runs on port 5050.

```bash
$ docker run --net=host -e SHOWTIME_EXTERNAL_IP=EXTERNALIP ghcr.io/showtime/server:GITHUB_VERSION
```

### Docker Compose

```yaml
version: "3.7"
services:
  showtime:
    image: ghcr.io/showtime/server:GITHUB_VERSION
    network_mode: host
    environment:
      SHOWTIME_EXTERNAL_IP: "EXTERNALIP"
```

### Standard Port Binding

!> When using standard port binding, TURN requires setting both the internal and external ports.

```bash
$ docker run \
    -p 5050:5050 \
    -p 3478:3478 \
    -p 50000-50100:50000-50100/udp \
    -e SHOWTIME_EXTERNAL_IP=EXTERNALIP \
    -e SHOWTIME_TURN_PORT_RANGE=50000:50100 \
    ghcr.io/showtime/server:GITHUB_VERSION
```

### Docker Compose

```yaml
version: "3.7"
services:
  showtime:
    image: ghcr.io/showtime/server:GITHUB_VERSION
    ports:
      - 5050:5050
      - 3478:3478
      - 50000-50100:50000-50100/udp
    environment:
      SHOWTIME_EXTERNAL_IP: "EXTERNALIP"
      SHOWTIME_TURN_PORT_RANGE: 50000:50100
```

## Binary

### Supported Platforms:

- linux_amd64 (64bit)
- linux_i386 (32bit)
- armv7 (32bit used for Raspberry Pi)
- armv6
- arm64 (ARMv8)
- ppc64
- ppc64le
- windows_i386.exe (32bit)
- windows_amd64.exe (64bit)

Download the zip with the binary for your platform from [screego/server Releases](https://github.com/screego/server/releases).

```bash
$ wget https://github.com/screego/server/releases/download/vGITHUB_VERSION/screego_GITHUB_VERSION_{PLATFORM}.tar.gz
```

Unzip the archive.

```bash
$ tar xvf screego_GITHUB_VERSION_{PLATFORM}.tar.gz
```

Make the binary executable (linux only).

```bash
$ chmod +x screego
```

Execute screego:

```bash
$ ./screego
# on windows
$ screego.exe
```

## Arch-Linux(aur)

!> Maintenance of the AUR Packages is not performed by the Screego team.
   You should always check the PKGBUILD before installing an AUR package.

Screego's latest release is available in the AUR as [screego-server](https://aur.archlinux.org/packages/screego-server/) and [screego-server-bin](https://aur.archlinux.org/packages/screego-server-bin/).
The development-version can be installed with [screego-server-git](https://aur.archlinux.org/packages/screego-server-git/).

## FreeBSD

!> Maintenance of the FreeBSD Package is not performed by the Screego team.
   Check yourself, if you can trust it.

```bash
$ pkg install screego
```

## Source

[See Development#build](development.md#build)
