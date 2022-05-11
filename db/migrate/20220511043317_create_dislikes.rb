class CreateDislikes < ActiveRecord::Migration[7.0]
  def change
    create_table :dislikes do |t|
      t.integer :user_id
      t.integer :disliked_user_id

      t.timestamps
    end
  end
end
