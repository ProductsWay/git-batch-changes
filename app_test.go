package main

import (
	"context"
	"testing"
)

func TestApp_GetGithubRepositories(t *testing.T) {
	type fields struct {
		ctx context.Context
	}
	type args struct {
		username string
	}
	tests := []struct {
		name   string
		fields fields
		args   args
		want   string
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			a := &App{
				ctx: tt.fields.ctx,
			}
			if got := a.GetGithubRepositories(tt.args.username); got != tt.want {
				t.Errorf("App.GetGithubRepositories() = %v, want %v", got, tt.want)
			}
		})
	}
}
