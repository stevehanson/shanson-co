FactoryGirl.define do
  factory :post do
    sequence(:title) { |n| "My Post #{n}" }
    sequence(:slug) { |n| "my-post-#{n}" }
    sequence(:body) { |n| "This is the body #{n}" }

    trait :published do
      published true
    end
  end
end
