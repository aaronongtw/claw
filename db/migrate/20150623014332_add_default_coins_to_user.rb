class AddDefaultCoinsToUser < ActiveRecord::Migration
  def change
    change_column_default :users, :coins, 0
  end
end
