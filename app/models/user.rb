class User < ApplicationRecord
  has_secure_password
  has_many :matches
  has_many :browsed_user, through: :matches
  validates :first_name, presence: true
  validates :dob_day, presence: true
  validates :dob_month, presence: true
  validates :dob_year, presence: true
  validates :show_gender, presence: true
  validates :gender_identity, presence: true
  validates :gender_interest, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :url1, presence: true
  validates :about, presence: true
  validates :password, presence: true, length: {minimum: 6}, if: :password

  def get_users(params)
    user_browsed_user_ids = self.matches.map do |match|
      match.browsed_user_id
    end
    user_browsed_user_ids.unshift(self.id)
    if params[:gender_interest] == "everyone"
      return User.all.where.not(id: user_browsed_user_ids).and(User.all.where(gender_interest: params[:gender_identity]).or(User.all.where(gender_interest: "everyone")))
    else
      return User.all.where.not(id: user_browsed_user_ids).where(gender_identity: params[:gender_interest]).and(User.all.where(gender_interest: params[:gender_identity]).or(User.all.where(gender_interest: "everyone")))
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
