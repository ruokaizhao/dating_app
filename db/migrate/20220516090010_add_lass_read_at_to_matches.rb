class AddLassReadAtToMatches < ActiveRecord::Migration[7.0]
  def change
    add_column :matches, :last_read_at, :datetime
  end
end
