class UserVoucher < ActiveRecord::Migration
  def change
    rename_table :client_games, :clients_games
    rename_table :game_users, :games_users
    create_table :users_vouchers do |t|
      t.integer :user_id
      t.integer :voucher_id
    end
  end
end
