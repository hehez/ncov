.DEFAULT_GOAL := install

install: 
	npm install

build:
	docker build -t app .

run:
	docker run -p 80:3000 -d app

start: build run

stop:
	docker stop $(docker ps -a -q)
	docker rm $(docker ps -a -q)