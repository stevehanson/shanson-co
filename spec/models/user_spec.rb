require 'rails_helper'

describe User do
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:email) }
  it { should validate_presence_of(:uid) }

  describe "#has_access?" do
    let(:steve) { create(:user, email: "s.hanson5@gmail.com") }
    let(:shanson) { create(:user, email: "steve@shanson.co") }
    let(:gandalf) { create(:user, email: "gandalf@gmail.com") }
    let(:saruman) { create(:user, email: "saruman@hotmail.com") }
    let(:sauron) { create(:user, email: "sauron@aol.com") }

    it "returns true for s.hanson5@gmail.com or steve@shanson.co" do
      expect(steve.has_access?).to be true
      expect(shanson.has_access?).to be true
    end

    it "returns true for comma-separated emails in ENV[HAS_ADMIN_ACCESS]" do
      ENV["HAS_ADMIN_ACCESS"] = "gandalf@gmail.com,saruman@hotmail.com"
      expect(gandalf.has_access?).to be true
      expect(saruman.has_access?).to be true
    end

    it "returns false for emails not in ENV or shanson" do
      expect(sauron.has_access?).to be false
    end
  end
end