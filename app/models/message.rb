class Message < ApplicationRecord  

  def self.new_message(params)
    uuid = Match.where(user_id: params[:sender_id]).where(browsed_user_id: params[:recipient_id])[0][:pair_id]
    message = Message.create!(pair_id: uuid, sender_id: params[:sender_id], recipient_id: params[:recipient_id], content: params[:content])
    ActionCable.server.broadcast("chat_#{params[:recipient_id]}", message)
    return message
  end

  def self.messages(params)
    pair_id = Match.all.where(user_id: params[:sender_id]).where(browsed_user_id: params[:recipient_id])[0][:pair_id]
    Message.all.where(pair_id: pair_id)
  end

end
