.DEFAULT_GOAL := install

install: 
	npm install

build:
	docker build -t wuhan-ncov-2020-be .

run:
	docker run -p 80:3000 -d wuhan-ncov-2020-be

start: build run

stop:
	docker stop $$(docker ps -a -q)
	docker rm $$(docker ps -a -q)