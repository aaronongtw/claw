class AddResetscoreToGames < ActiveRecord::Migration
  def change
    add_column :games, :resetscores, :boolean, :default => true
  end
end
