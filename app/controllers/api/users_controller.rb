class Api::UsersController < ApplicationController

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


  private

  def user_params
    params.permit(
      :first_name, 
      :dob_day, 
      :dob_month, 
      :dob_year, 
      :show_gender, 
      :gender_identity, 
      :gender_interest, 
      :email, 
      :url1, 
      :about, 
      :password, 
      :password_confirmation)
  end

end
