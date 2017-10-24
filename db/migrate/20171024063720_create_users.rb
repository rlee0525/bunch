class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :fb_id, null: false
      t.string :fb_email
      t.string :fb_picture
      t.string :first_name
      t.string :last_name
      t.string :birthday
      t.string :user_education_history
      
      t.timestamps
    end

    add_index :users, :fb_id
  end
end
