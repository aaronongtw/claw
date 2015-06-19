class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email
      t.string :username
      t.boolean :admin
      t.string :location
      t.integer :coins
      t.float :latitude
      t.float :longitude
      t.string :password_digest

      t.timestamps null: false
    end
  end
end
