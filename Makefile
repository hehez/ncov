.DEFAULT_GOAL := build

CONTAINER_NAME = wuhan-https
IMAGE_NAME = wuhan-web-be

install: 
	npm install

build:
	docker build -t $(IMAGE_NAME)  .

run:
	docker run --name $(CONTAINER_NAME) -p 5000:5000 -d $(IMAGE_NAME)

start: build run

stop:
	docker stop $$(docker ps -a -q -f name=$(CONTAINER_NAME))
	docker rm $$(docker ps -a -q -f name=$(CONTAINER_NAME))
