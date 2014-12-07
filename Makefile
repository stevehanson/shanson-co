default: start

install:
	@bundle install

clean:
	@echo 'clean task not implemented'

build:
	@echo 'build task not implemented'

start:
	@bundle exec rails s

test:
	@bundle exec rspec

spec: test

