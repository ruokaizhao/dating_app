class Api::MatchesController < ApplicationController

  def create
    match = Match.new_match(params)
    render json: match, status: :created
  end

  def update_last_read_at
    match = Match.where(user_id: params[:user_id]).where(browsed_user_id: params[:browsed_user_id])[0]
    match.update!(last_read_at: params[:last_read_at])
    render json: match, status: :ok
  end

  def get_match
    match = Match.where(user_id: params[:user_id]).where(browsed_user_id: params[:recipient_id])[0]
    render json: match, status: :ok
  end

end
