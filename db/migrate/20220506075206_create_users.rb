class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :first_name
      t.integer :dob_day
      t.integer :dob_month
      t.integer :dob_year
      t.boolean :show_gender
      t.string :gender_identity
      t.string :gender_interest
      t.string :email, index: true
      t.string :url1
      t.text :about
      t.string :password_digest

      t.timestamps
    end
  end
end
