package main

import (
	"path/filepath"
	"time"
	"strings"
)

func buildFileName(filename string) string {
	ext := filepath.Ext(filename)
	base := strings.TrimSuffix(filename, ext)
    timeName := time.Now().Format("20060102150405")
	return base + timeName + ext
}