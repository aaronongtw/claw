class CreateClientGame < ActiveRecord::Migration
  def change
    create_table :client_games do |t|
      t.integer :client_id
      t.integer :game_id
    end
  end
end
