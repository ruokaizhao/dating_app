class Api::MessagesController < ApplicationController

  def create_message
    message = Message.new_message(params)
    render json: message, status: :created
  end

  def message_history # get message history of a single matched user
    messages = Message.messages(params)
    render json: messages, status: :ok
  end

  def message_histories # get message histories of all the matched users
    user = User.find(params[:user_id])
    matched_users = user.get_match_users
    list_messages = Message.list_messages(user, matched_users)
    render json: list_messages, status: :ok
  end

end
