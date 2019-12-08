package main

import (
	"encoding/json"
	"fmt"
	"github.com/microcosm-cc/bluemonday"
	"github.com/tdewolff/minify/v2"
	"github.com/tdewolff/minify/v2/html"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
	"strings"
)

func main() {
	if len(os.Args) < 2 {
		fmt.Println("no target folder given")
		os.Exit(1)
	}

	out := map[string]string{}
	dir := os.Args[1]
	files, err := filepath.Glob(dir + "/*.html")
	if err != nil {
		log.Fatal(err)
	}

	for _, f := range files {
		key := strings.TrimPrefix(f, dir+"/")
		key = strings.TrimSuffix(key, ".html")
		content, err := readFile(f)
		if err != nil {
			log.Fatal(err)
		}
		out[key] = content
	}

	j, err := json.MarshalIndent(out, "", "  ")
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(string(j))
}

func readFile(path string) (string, error) {
	content, err := ioutil.ReadFile(path)
	if err != nil {
		return "", err
	}
	p := bluemonday.NewPolicy()
	p.AllowElements("p", "b", "strong", "i", "span")
	p.AllowAttrs("style").OnElements("p", "span")
	out := p.SanitizeBytes(content)
	m := minify.New()
	m.AddFunc("text/html", html.Minify)
	out, err = m.Bytes("text/html", out)
	if err != nil {
		return "", err
	}
	return string(out), nil
}
