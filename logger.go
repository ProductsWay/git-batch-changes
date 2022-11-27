package main

import (
	"bytes"
	"fmt"

	"github.com/go-playground/log/v8"
)

// CustomHandler is your custom handler
type CustomHandler struct {
	// whatever properties you need
}

// Log accepts log entries to be processed
func (c *CustomHandler) Log(e log.Entry) {
	b := new(bytes.Buffer)
	b.Reset()
	b.WriteString(e.Message)

	for _, f := range e.Fields {
		_, _ = fmt.Fprintf(b, " %s=%v", f.Key, f.Value)
	}
	fmt.Println(b.String())
}
