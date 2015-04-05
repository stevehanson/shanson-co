FactoryGirl.define do
  factory :post do
    title "My Post"
    slug "my-post"
    body "This is the body"

    factory :published_post do
      published true
    end
  end
end
