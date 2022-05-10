class Match < ApplicationRecord
  belongs_to :user
  belongs_to :matched_user, class_name: "User", foreign_key: matched_user_id
end
