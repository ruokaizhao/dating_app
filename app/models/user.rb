class User < ApplicationRecord
  has_secure_password
  has_many :matches
  has_many :browsed_user, through: :matches
  # If all those data are submitted seperately, the if: :first_name is required, otherwise the create method won't pass validation
  validates :first_name, presence: true, if: :first_name
  validates :dob_day, presence: true, numericality: { in: 1..31 }, if: :dob_day
  validates :dob_month, presence: true, numericality: { in: 1..12 }, if: :dob_month
  validates :dob_year, presence: true, numericality: { in: 1900..2020 }, if: :dob_year
  validates :show_gender, presence: true, if: :show_gender
  validates :gender_identity, presence: true, if: :gender_identity
  validates :gender_interest, presence: true, if: :gender_interest
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }, if: :email
  validates :url1, presence: true, if: :url1
  validates :about, presence: true, if: :about
  validates :password, presence: true, length: {minimum: 6}, if: :password

  def get_users(params)
    user_browsed_user_ids = self.matches.map do |match|
      match.browsed_user_id
    end
    user_browsed_user_ids.unshift(self.id)
    if params[:gender_interest] == "everyone"
      # return User.all.where.not(id: user_browsed_user_ids).and(User.all.where(gender_interest: params[:gender_identity]).or(User.all.where(gender_interest: "everyone")))
      return User.all.where.not(id: user_browsed_user_ids)
    else
      # return User.all.where.not(id: user_browsed_user_ids).where(gender_identity: params[:gender_interest]).and(User.all.where(gender_interest: params[:gender_identity]).or(User.all.where(gender_interest: "everyone")))
      return User.all.where.not(id: user_browsed_user_ids).where(gender_identity: params[:gender_interest])
    end
  end

  def get_match_users
    user_liked_user_ids = self.matches.where(liked: true).map do |match|
      match.browsed_user_id
    end
    user_liked_users = User.all.where(id: user_liked_user_ids)
    user_liked_users.filter do |user_liked_user|
      user_liked_user.matches.where(browsed_user_id: self.id)[0] && user_liked_user.matches.where(browsed_user_id: self.id)[0][:liked] == true
    end
  end

  def send_password_reset
    self.update!(password_reset_token: self.generate_base64_token, password_reset_sent_at: Time.zone.now)
    UserMailer.with(user: self, token: self.password_reset_token).password_reset_email.deliver_now
  end

  def reset_password(params)
      self.update!(password: params[:password], password_confirmation: params[:password_confirmation])      
      self.update!(password_reset_token: nil, password_reset_sent_at: nil)    
  end

  private

  def generate_base64_token
    SecureRandom.urlsafe_base64
  end
  
end
