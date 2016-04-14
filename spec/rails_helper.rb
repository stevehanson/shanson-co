# This file is copied to spec/ when you run 'rails generate rspec:install'
ENV['RAILS_ENV'] ||= 'test'

require "simplecov"
# require "webmock/rspec"
SimpleCov.start :rails do
  add_group "Services", "app/services"
end

require File.expand_path('../../config/environment', __FILE__)

# Prevent database truncation if the environment is production
abort("The Rails environment is running in production mode!") if Rails.env.production?
require 'spec_helper'
require 'rspec/rails'
require "factory_girl_rails"
require "shoulda/matchers"
require "rake"
require "timecop"
require 'capybara/email/rspec'

# Requires supporting ruby files with custom matchers and macros, etc, in
# spec/support/ and its subdirectories. Files matching `spec/**/*_spec.rb` are
# run as spec files by default. This means that files in spec/support that end
# in _spec.rb will both be required and run as specs, causing the specs to be
# run twice. It is recommended that you do not name files matching this glob to
# end with _spec.rb. You can configure this pattern with the --pattern
# option on the command line or in ~/.rspec, .rspec or `.rspec-local`.
#
# The following line is provided for convenience purposes. It has the downside
# of increasing the boot-up time by auto-requiring all files in the support
# directory. Alternatively, in the individual `*_spec.rb` files, manually
# require only the support files necessary.
#
Dir[Rails.root.join('spec/support/**/*.rb')].each { |f| require f }

# Checks for pending migrations before tests are run.
# If you are not using ActiveRecord, you can remove this line.
ActiveRecord::Migration.maintain_test_schema!

RSpec.configure do |config|
  # Factory Girl Helper Methods
  config.include FactoryGirl::Syntax::Methods
  config.include Features, type: :feature

  config.use_transactional_fixtures = false
  config.infer_spec_type_from_file_location!
  # config.filter_rails_from_backtrace!

  config.before(:suite) do
    # Rails.application.config.active_job.queue_adapter = :test
    # TODO: WebMock.disable_net_connect!(allow_localhost: true)
    Capybara.javascript_driver = :webkit
    Capybara.automatic_reload = false
    Capybara::Screenshot.webkit_options = { width: 1024, height: 768 }

    DatabaseCleaner.clean_with(:truncation)
    Rails.application.load_tasks
  end

  config.before(:each) do
    Rails.cache.clear
    # set the default
    DatabaseCleaner.strategy = :transaction
  end

  config.before(:each, js: true) do
    DatabaseCleaner.strategy = :truncation
  end

  config.before(:each) do
    DatabaseCleaner.start
  end

  config.append_after(:each) do
    DatabaseCleaner.clean
  end
end

Capybara::Webkit.configure do |config|
  config.debug = false

  # Silently return an empty 200 response for any requests to unknown URLs.
  # this only affects browser URLs, I think
  config.block_unknown_urls
  config.allow_url("http://maxcdn.bootstrapcdn.com")

  # We also have the Capybara Screenshot gem
  # To take a screenshot anywhere in your feature tests, call either:
  #     screenshot_and_open_image
  #     screenshot_and_save_page
end

Shoulda::Matchers.configure do |config|
  config.integrate do |with|
    with.test_framework :rspec
    with.library :rails
  end
end
