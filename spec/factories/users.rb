FactoryGirl.define do
  factory :user do
    name "James Otis"
    email "jim@gmail.com"
    sequence(:uid) { |n| n }
  end
end
