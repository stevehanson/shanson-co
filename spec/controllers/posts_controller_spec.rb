require "rails_helper"

describe PostsController do
  describe "#index" do
    it "doesn't include draft posts" do
      create(:post)
      get :index
      expect(assigns(:posts).count).to be 0
    end

    it "includes published posts" do
      create(:post, :published)
      get :index
      expect(assigns(:posts).count).to be 1
    end
  end

  describe "#show" do
    it "retrieves by slug" do
      post = create(:post, :published)
      get :show, id: post.slug
      expect(assigns(:post).title).to eq post.title
    end
  end
end