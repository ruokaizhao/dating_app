class Api::UsersController < ApplicationController

  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :create
  end

  def show
    user = User.find(session[:user_id])
    render json: user, status: :ok
  end

  private

  def user_params
    params.permit()
  end

end
