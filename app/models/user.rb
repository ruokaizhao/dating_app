class User < ApplicationRecord
  has_secure_password
  has_many :likes
  has_many :liked_users, through: :likes
  has_many :dislikes
  has_many :disliked_user, through: :dislikes
  validates :password, presence: true, length: {minimum: 6}, if: :password
end
