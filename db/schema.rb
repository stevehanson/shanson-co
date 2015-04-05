# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150405041530) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "authorizations", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "provider",        limit: 50
    t.string   "uid"
    t.string   "token",           limit: 500
    t.datetime "expires_at"
    t.datetime "last_session_at"
    t.string   "last_session_ip"
    t.integer  "session_count",               default: 0
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "authorizations", ["token"], name: "index_authorizations_on_token", using: :btree
  add_index "authorizations", ["uid"], name: "index_authorizations_on_uid", using: :btree
  add_index "authorizations", ["user_id", "provider"], name: "index_authorizations_on_user_id_and_provider", using: :btree
  add_index "authorizations", ["user_id"], name: "index_authorizations_on_user_id", using: :btree

  create_table "clients", force: :cascade do |t|
    t.string   "name"
    t.string   "slug"
    t.boolean  "show_logo"
    t.boolean  "show_promo_video"
    t.boolean  "show_custom_video"
    t.string   "logo"
    t.string   "hero"
    t.string   "commerce_large"
    t.string   "commerce_1"
    t.string   "commerce_2"
    t.string   "commerce_3"
    t.string   "commerce_4"
    t.string   "commerce_5"
    t.string   "custom_video_mp4"
    t.string   "custom_video_webm"
    t.string   "custom_promo_video_mp4"
    t.string   "custom_promo_video_webm"
    t.integer  "template_id"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  add_index "clients", ["template_id"], name: "index_clients_on_template_id", using: :btree

  create_table "people", force: :cascade do |t|
    t.string   "name"
    t.string   "image"
    t.string   "image_alt"
    t.string   "avatar"
    t.string   "description"
    t.string   "title"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "posts", force: :cascade do |t|
    t.string   "slug"
    t.string   "title"
    t.text     "body"
    t.datetime "published_at"
    t.string   "layout"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.boolean  "draft",        default: true, null: false
    t.integer  "kudos",        default: 0,    null: false
  end

  create_table "tags", force: :cascade do |t|
    t.string   "name"
    t.integer  "count"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "uid"
    t.string   "email"
    t.string   "domain"
    t.string   "avatar_url"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
