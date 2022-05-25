class AddSexualOrientationAndShowSexualOrientationToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :sexual_orientation, :string
    add_column :users, :show_sexual_orientation, :boolean
  end
end
