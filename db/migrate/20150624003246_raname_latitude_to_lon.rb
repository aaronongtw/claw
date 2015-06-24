class RanameLatitudeToLon < ActiveRecord::Migration
  def change
    rename_column :users, :latitude, :lat
  end
end
