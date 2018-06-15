default: install start

install:
	@bundle install

clean:
	@echo 'clean task not implemented'

build:
	@bundle exec middleman build

deploy:
	@rake publish

start:
	@bundle exec middleman server

.PHONY: install clean build start test console
