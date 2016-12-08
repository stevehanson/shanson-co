default: install start
deploy: build deployToSurge

install:
	@bundle install

clean:
	@echo 'clean task not implemented'

build:
	@bundle exec middleman build

deployToSurge:
	surge build --domain shanson.surge.sh

start:
	@bundle exec middleman server

.PHONY: install clean build start test console
