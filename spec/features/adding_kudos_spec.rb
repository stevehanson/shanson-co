require "rails_helper"

feature "adding kudos", js: true do
  let!(:post) { create(:post, :published, published_at: Time.current - 1.day )}

  scenario "can add a kudo to a post" do
    visit show_post_path(post.slug)
    expect(page).to have_content "0 kudos"
    find('.kudo-heart').click
    expect(page).to have_content "1 kudo"
    find('.kudo-heart').click
    expect(page).to have_content "0 kudos"
    find('.kudo-heart').click
    expect(page).to have_content "1 kudo"
    reload_page
    expect(page).to have_content "1 kudo"
  end
end