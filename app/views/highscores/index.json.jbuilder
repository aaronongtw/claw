json.array!(@highscores) do |highscore|
  json.extract! highscore, :id, :user_id, :game_id, :score
  json.url highscore_url(highscore, format: :json)
end
