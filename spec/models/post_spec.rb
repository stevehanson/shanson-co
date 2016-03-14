require 'rails_helper'

describe Post do
  it { should validate_presence_of(:body) }
  it { should validate_presence_of(:slug) }
  it { should validate_presence_of(:title) }
end