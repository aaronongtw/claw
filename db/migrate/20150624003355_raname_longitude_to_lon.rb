class RanameLongitudeToLon < ActiveRecord::Migration
  def change
    rename_column :users, :longitude, :lon
  end
end
