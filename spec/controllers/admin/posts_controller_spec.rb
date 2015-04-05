require "rails_helper"

describe Admin::PostsController do
  context "An authenticated user" do
    let(:user) { create(:user) }

    before do
      session[:current_user_id] = user.id
    end

    describe "#index" do
      context "html" do
        it "loads the ember app template" do
          get :index, format: :html
          expect(response).to render_template("admin/index")
        end
      end

      context "json" do
        it "loads json posts, including drafts" do
          post = create(:post)
          get :index, format: :json
          res = JSON.parse(response.body)
          expect(res["posts"].first["slug"]).to eq post.slug
        end
      end
    end
  end

  context "An unauthenticated user" do
    it "cannot access admin endpoints" do
      expect_unauthorized(:get,    :index)
      expect_unauthorized(:post,   :create)
      expect_unauthorized(:put,   :update, id: 1)
      expect_unauthorized(:delete, :destroy, id: 1)
      expect_unauthorized(:post,    :markdown_preview, id: 1)
    end
  end

  def expect_unauthorized(method, action, options = {})
    send(method, action, options)
    expect(response).to redirect_to "/admin/login"
  end
end