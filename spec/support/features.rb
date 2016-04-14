module Features
  def console_errors
    page.driver.console_messages
  end

  def print_console_errors
    console_errors.each { |error| puts error }
  end

  def reload_page
    visit current_path
  end
end