package main

import (
	"path/filepath"
	"strings"
	"time"
	"net/http"
	"os"
	"io"
)

func buildFileName(filename string) string {
	ext := filepath.Ext(filename)
	base := strings.TrimSuffix(filename, ext)
	timeName := time.Now().Format("20060102150405")
	return base + timeName + ext
}

func saveCoverFile(r *http.Request) (string, error) {
	var filename string
	f, header, err := r.FormFile("cover")
	if err != nil {
		filename = ""
	} else {
		filename = buildFileName(header.Filename)

		diskFile, err := os.Create("covers/" + filename)
		if err != nil {
			return "", err
		}
		_, err = io.Copy(diskFile, f)
		if err != nil {
			return "", err
		}
	}

	return filename, err
}