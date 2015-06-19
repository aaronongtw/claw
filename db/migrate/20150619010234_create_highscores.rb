class CreateHighscores < ActiveRecord::Migration
  def change
    create_table :highscores do |t|
      t.integer :user_id
      t.integer :game_id
      t.integer :score

      t.timestamps null: false
    end
  end
end
