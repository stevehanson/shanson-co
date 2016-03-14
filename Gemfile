source 'https://rubygems.org'
ruby '2.3.0'

gem 'rails', '4.2.0'
gem 'pg'

gem 'sass-rails', '~> 5.0.0.beta1'
gem "autoprefixer-rails"
gem 'uglifier', '>= 1.3.0'
gem 'jquery-rails', '~> 4.0.3'
gem 'turbolinks'
gem 'jbuilder', '~> 2.0'
gem 'sdoc', '~> 0.4.0', group: :doc
gem 'redcarpet', '~> 3.0.0'

#auth
gem "omniauth"
gem "omniauth-google-oauth2"

#admin
gem 'ember-rails'
gem 'ember-source', '~> 1.11.0'

gem "dotenv", "~> 1.0.2"
gem "thin"

group :development, :test do
  gem 'better_errors'
  gem 'dotenv-rails'
  gem "pry-rails"
  gem 'pry-nav'
  gem 'spring-commands-rspec' # use spring to load tests quickly
end

group :test do
  gem 'capybara', '~> 2.5.0'
  gem 'capybara-webkit', '~> 1.7.1'
  gem 'capybara-email'
  gem 'capybara-screenshot'
  gem 'database_cleaner'
  gem 'factory_girl_rails'
  gem "faker"
  gem "launchy"
  gem 'rspec-rails'
  gem 'shoulda-matchers'
  gem 'simplecov', require: false
  gem 'timecop', require: false
  gem 'webmock', require: false
end

group :production do
  gem 'newrelic_rpm'
  gem 'rails_12factor'
end
