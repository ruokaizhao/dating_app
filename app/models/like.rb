class Like < ApplicationRecord
  belongs_to :user
  belongs_to :disliked_user, class_name: "User", foreign_key: "disliked_user_id"
end
