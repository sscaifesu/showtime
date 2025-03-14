package main

import (
	"github.com/showtime/server/cmd"
	pmode "github.com/showtime/server/config/mode"
)

var (
	version    = "unknown"
	commitHash = "unknown"
	mode       = pmode.Dev
)

func main() {
	pmode.Set(mode)
	cmd.Run(version, commitHash)
}
