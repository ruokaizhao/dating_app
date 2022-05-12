class User < ApplicationRecord
  has_secure_password
  has_many :matches
  has_many :browsed_user, through: :matches
  validates :password, presence: true, length: {minimum: 6}, if: :password

  def get_users(params)
    user_matches = self.matches.map do |match|
      match.browsed_user_id
    end
    user_matches.unshift(self.id)
    if params[:gender_interest] == "everyone"
      return User.all.where.not(id: user_matches).and(User.all.where(gender_interest: params[:gender_identity]).or(User.all.where(gender_interest: "everyone")))
    else
      return User.all.where.not(id: user_matches).where(gender_identity: params[:gender_interest]).and(User.all.where(gender_interest: params[:gender_identity]).or(User.all.where(gender_interest: "everyone")))
    end
  end

end
