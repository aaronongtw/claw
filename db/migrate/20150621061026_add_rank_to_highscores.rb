class AddRankToHighscores < ActiveRecord::Migration
  def change
    add_column :highscores, :rank, :integer
  end
end
