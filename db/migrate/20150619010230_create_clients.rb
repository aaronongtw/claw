class CreateClients < ActiveRecord::Migration
  def change
    create_table :clients do |t|
      t.string :name
      t.text :location
      t.string :type
      t.float :latitude
      t.float :longitude

      t.timestamps null: false
    end
  end
end
