class AddPairIdToMatch < ActiveRecord::Migration[7.0]
  def change
    change_table :matches do |t|
      t.string :pair_id
    end
  end
end
