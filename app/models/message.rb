class Message < ApplicationRecord  
  validates :content, presence: true

  def self.new_message(params)
    browsed_user = User.find(params[:recipient_id])
    uuid = Match.where(user_id: params[:sender_id]).where(browsed_user_id: params[:recipient_id])[0][:pair_id]
    message = Message.create!(pair_id: uuid, sender_id: params[:sender_id], recipient_id: params[:recipient_id], content: params[:content])
    ActionCable.server.broadcast("chat_#{params[:recipient_id]}", "")
    ActionCable.server.broadcast("chat_#{params[:recipient_id]}#{params[:sender_id]}", message)
    return message
  end

  def self.messages(params)
    pair_id = Match.all.where(user_id: params[:sender_id]).where(browsed_user_id: params[:recipient_id])[0][:pair_id]
    Message.all.where(pair_id: pair_id)
    # Message.all.where(pair_id: pair_id).order(created_at: :desc).paginate(page: params[:page], per_page: 100)
  end

  def self.list_messages(user, matched_users)
    pair_ids = matched_users.map do |matched_user|
      Match.all.where(user_id: user[:id]).where(browsed_user_id: matched_user[:id])[0][:pair_id]
    end
    not_empty_list_message_pair_ids = pair_ids.filter do |pair_id|
      Message.all.where(pair_id: pair_id).length != 0
    end
    not_empty_list_message_pair_ids.map do |pair_id|
      Message.all.where(pair_id: pair_id).order(created_at: :desc).limit(100).map do |message|
        ActiveModelSerializers::Adapter::Json.new(
          ListMessagesSerializer.new(message)
        ).serializable_hash
      end
    end
  end

end