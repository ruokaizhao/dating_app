class AddIndexToMatchesOnBrowsedUserId < ActiveRecord::Migration[7.0]
  def change
    change_table :matches do |t|
      t.index :browsed_user_id
    end
  end
end
