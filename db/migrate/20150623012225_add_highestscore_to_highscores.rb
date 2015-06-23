class AddHighestscoreToHighscores < ActiveRecord::Migration
  def change
    add_column :highscores, :highestscore, :integer
  end
end
