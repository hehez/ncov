.DEFAULT_GOAL := build

install: 
	npm install

build:
	docker build -t wuhan-ncov-2020-be .

run:
	docker run --name wuhan-https -p 80:3000 -d wuhan-ncov-2020-be

start: build run

stop:
	docker stop $$(docker ps -a -q)
	docker rm $$(docker ps -a -q)
