# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_05_25_174453) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "matches", force: :cascade do |t|
    t.integer "user_id"
    t.boolean "liked"
    t.integer "browsed_user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "pair_id"
    t.datetime "last_read_at"
    t.index ["browsed_user_id"], name: "index_matches_on_browsed_user_id"
  end

  create_table "messages", force: :cascade do |t|
    t.integer "sender_id"
    t.integer "recipient_id"
    t.text "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "pair_id"
    t.index ["recipient_id"], name: "index_messages_on_recipient_id"
    t.index ["sender_id"], name: "index_messages_on_sender_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.integer "dob_day"
    t.integer "dob_month"
    t.integer "dob_year"
    t.boolean "show_gender"
    t.string "gender_identity"
    t.string "gender_interest"
    t.string "email"
    t.string "url1"
    t.text "about"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "password_reset_token"
    t.datetime "password_reset_sent_at"
    t.string "sexual_orientation"
    t.boolean "show_sexual_orientation"
    t.index ["email"], name: "index_users_on_email"
  end

end
