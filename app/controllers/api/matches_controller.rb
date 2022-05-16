class Api::MatchesController < ApplicationController

  def create
    match = Match.new_match(params)
    render json: match, status: :created
  end

  # private

  # def match_params
  #   params.permit(:user_id, :browsed_user_id, :liked)
  # end

end
