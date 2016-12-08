default: install start
deploy: build deployAws

install:
	@bundle install

clean:
	@echo 'clean task not implemented'

build:
	@bundle exec middleman build

deployAws:
	@bundle exec middleman s3_sync

start:
	@bundle exec middleman server

.PHONY: install clean build start test console
