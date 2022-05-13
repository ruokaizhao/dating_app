class AddPairIdToMessages < ActiveRecord::Migration[7.0]
  def change
    change_table :messages do |t|
      t.integer :pair_id
      t.index :sender_id
      t.index :recipient_id
    end
  end
end
