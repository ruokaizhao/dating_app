class Match < ApplicationRecord
  belongs_to :user
  belongs_to :browsed_user, class_name: "User", foreign_key: "browsed_user_id"
end
