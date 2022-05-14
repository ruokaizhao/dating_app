require 'securerandom'

class Message < ApplicationRecord  

  def self.new_message(params)
    message_from = Message.all.where(sender_id: params[:sender_id]).where(recipient_id: params[:recipient_id])
    message_to = Message.all.where(sender_id: params[:recipient_id]).where(recipient_id: params[:sender_id])
    if message_from[0] || message_to[0]
      uuid = message_from[0].try(:pair_id) || message_to[0][:pair_id]      
    else
      uuid = SecureRandom.uuid
    end
    Message.create!(pair_id: uuid, sender_id: params[:sender_id], recipient_id: params[:recipient_id], content: params[:content])
  end

  def self.messages(params)
    Message.all.where(sender_id: params[:sender_id]).where(recipient_id: params[:recipient_id]).or(Message.all.where(sender_id: params[:recipient_id]).where(recipient_id: params[:sender_id]))
  end

end
