# Development

Showtime requires:

* Go >= 1.16
* Node >= 14
* Yarn

## Setup

Clone showtime/server source from git:

```bash
$ git clone https://github.com/showtime/server.git && cd server
```

Install frontend dependencies:

```bash
$ (cd ui && yarn)
```

## Start Server

Start the frontend development server:

```bash
$ (cd ui && yarn start)
```

Create a file named `showtime.config.development.local` inside the showtime folder with the content:

```ini
SHOWTIME_EXTERNAL_IP=YOURIP
```

Start the backend development server:

```bash
$ go run main.go serve
```

## Build

Build the frontend:

```bash
$ (cd ui && yarn build)
```

Build the backend:

```bash
$ go build -ldflags "-X main.version=$(git describe --tags HEAD) -X main.mode=prod" -o showtime ./main.go
```

## Lint

Showtime uses [golangci-lint](https://github.com/golangci/golangci-lint) for linting.

Install golangci-lint:

See [golangci-lint install](https://github.com/golangci/golangci-lint#install).

Run lint:

```bash
$ golangci-lint run
```
