class ChangePairIdFromIntegerToStringOnMessage < ActiveRecord::Migration[7.0]
  def change
    change_column :messages, :pair_id, :string
  end
end
