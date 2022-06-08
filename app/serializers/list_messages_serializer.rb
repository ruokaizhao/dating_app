class ListMessagesSerializer < ActiveModel::Serializer
  attributes :id, :sender_id, :recipient_id, :content, :created_at, :pair_id

end
