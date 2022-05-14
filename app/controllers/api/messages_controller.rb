class Api::MessagesController < ApplicationController

  def create_message
    message = Message.new_message(params)
    render json: message, status: :created
  end

  def message_history
    messages = Message.messages(params)
    render json: messages, status: :ok
  end

end
