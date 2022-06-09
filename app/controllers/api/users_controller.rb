class Api::UsersController < ApplicationController
  skip_before_action :authorize, only: [:create, :forgot_password, :reset_password]

  def index
    user = User.find(params[:id])
    users = user.get_users(params)
    render json: users, status: :ok
  end

  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end

  def show
    user = User.find(session[:user_id])
    render json: user, status: :ok
  end

  def update
    user = User.find(params[:id])
    user.update!(user_params)
    render json: user, status: :ok
  end

  def match_users
    user = User.find(params[:id])
    users = user.get_match_users
    render json: users, status: :ok
  end

  def forgot_password
    user = User.find_by(email: params[:email])
    if user
      user.send_password_reset
      render json: {}, status: :created
    else
      render json: { errors: ["Email address not registered"] }, status: :not_found
    end
  end

  def reset_password
    user = User.find_by(email: params[:email])
    if user
      if user.password_reset_sent_at && user.password_reset_sent_at + 3600 >= Time.zone.now && user.password_reset_token == params[:token]
        user.reset_password(params)
        session[:user_id] = user.id
        render json: {user: user, alerts: ["Your password has been reset."] }, status: :created
      else
        render json: { errors: ["Token doesn't match or it has expired."] }, status: :unprocessable_entity
      end
    else
      render json: { errors: ["Email address not registered."] }, status: :not_found
    end
  end

  def change_password
    user = User.find(params[:id])
    if user&.authenticate(params[:current_password])
      user.update!(password: params[:password], password_confirmation: params[:password2])
      render json: user, status: :created
    else
      render json: { errors: ["Current password is not correct"] }, status: :unauthorized
    end
  end


  private

  def user_params
    params.permit(
      :first_name, 
      :dob_day, 
      :dob_month, 
      :dob_year, 
      :show_gender, 
      :gender_identity, 
      :show_sexual_orientation,
      :sexual_orientation,      
      :gender_interest, 
      :email, 
      :url1, 
      :about, 
      :password, 
      :password_confirmation)
  end

end
