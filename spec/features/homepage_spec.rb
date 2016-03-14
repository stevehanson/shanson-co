require "rails_helper"

feature "visiting the homepage" do
  let!(:post_old) { create(:post, :published, published_at: Time.current - 1.week ) }
  let!(:post_recent) { create(:post, :published, published_at: Time.current - 1.day )}
  let!(:post_unpublished) { create(:post, published_at: Time.current - 1.day )}

  scenario "the page loads" do
    visit root_path
    expect(page).to have_content "Hello, i’m shanson"
  end

  scenario "displays posts in descending chronological order" do
    visit root_path
    posts = all('.post-excerpt')
    expect(posts.length).to be 2
    expect(posts[0]).to have_content post_recent.title
    expect(posts[1]).to have_content post_old.title
  end

  scenario "only displays published posts" do
    visit root_path
    expect(page).not_to have_content post_unpublished.title
  end
end