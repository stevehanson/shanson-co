class User < ActiveRecord::Base
  validates :name,   presence: true
  validates :email,  presence: true, uniqueness: true
  validates :uid,    presence: true, uniqueness: true

  def valid_user?
    valid? && has_access?
  end

  def has_access?
    User.admin_emails.include?(email)
  end

  def can_post?
    User.super_admin_emails.include?(email)
  end

  private

  def self.super_admin_emails
    ["s.hanson5@gmail.com", "steve@shanson.co"] + admin_super_env_emails
  end

  def self.admin_emails
    [] + admin_env_emails + super_admin_emails
  end

  def self.admin_env_emails
    ENV["HAS_ADMIN_ACCESS"].to_s.split(",").map(&:strip)
  end

  def self.admin_super_env_emails
    ENV["HAS_SUPER_ACCESS"].to_s.split(",").map(&:strip)
  end
end