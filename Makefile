.DEFAULT_GOAL := install

install: 
	npm install

build:
	docker build -t wuhan .

run:
	docker run -p 8088:3000 -d wuhan

start: build run

stop:
	docker stop $$(docker ps -a -q)
	docker rm $$(docker ps -a -q)