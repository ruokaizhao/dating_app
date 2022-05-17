class ListMessagesSerializer < ActiveModel::Serializer
  attributes :id, :sender_id, :recipient_id, :content, :created_at

  # def last_read_at
  #   Match.all.where(user_id: self.object[:sender_id]).where(browsed_user_id: self.object[:recipient_id])[0][:last_read_at]
  # end

end
