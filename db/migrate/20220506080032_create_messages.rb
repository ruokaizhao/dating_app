class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.integer :user_id
      t.integer :recipient_id
      t.text :content

      t.timestamps
    end
  end
end
