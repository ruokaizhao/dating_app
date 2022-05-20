class AddPasswordResetTokenAndPasswordResetSentAtToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :password_reset_token, :string
    add_column :users, :password_reset_sent_at, :datetime
  end
end
