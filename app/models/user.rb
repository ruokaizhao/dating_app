class User < ApplicationRecord
  has_secure_password
  has_many :matches
  has_many :matched_users, through: :matches
  validates :password, presence: true, length: {minimum: 6}, if: :password
end
