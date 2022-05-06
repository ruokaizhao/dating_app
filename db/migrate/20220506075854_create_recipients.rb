class CreateRecipients < ActiveRecord::Migration[7.0]
  def change
    create_table :recipients do |t|
      t.string :first_name
      t.integer :dob_day
      t.integer :dob_month
      t.integer :dob_year
      t.boolean :show_gender
      t.string :gender_identity
      t.string :gender_interest
      t.string :email
      t.string :url1
      t.text :about

      t.timestamps
    end
  end
end
