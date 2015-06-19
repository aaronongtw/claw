class CreateVouchers < ActiveRecord::Migration
  def change
    create_table :vouchers do |t|
      t.string :name
      t.text :description
      t.datetime :expiry
      t.integer :client_id
      t.text :textstuff
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
