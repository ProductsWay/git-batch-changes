all: install dev

dev:
	wails dev

build-app:
	wails build

doctor:
	wails doctor

install:
	go install github.com/wailsapp/wails/v2/cmd/wails@latest
