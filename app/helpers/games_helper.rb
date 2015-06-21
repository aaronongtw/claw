module GamesHelper

  def check_db_score(name, score)
    
      u_id = @current_user.id #Need to fix this session variable! @current_user.id
      g_id = (Game.find_by :name => name).id

      #check if user has a game score
      user_hscore = Highscore.find_by :user_id => u_id, 
                                   :game_id => g_id

      #check if user highscore exists
      if user_hscore

        #only update if user score is lower than new score
        if user_hscore.score < score
            user_hscore.score = score
            user_hscore.save
        end

      #if not create a game score
      else
        user_hscore = Highscore.new
        user_hscore.user_id = u_id
        user_hscore.game_id = g_id
        user_hscore.score = score
        user_hscore.save

      end

      #runs the what_rank which returns ranking
      what_rank(user_hscore)

      return user_hscore.rank
  end



  def what_rank(user_hscore)

    #array of objects sorted by highest and oldest score
    #if first to get high score you are first
    rank_array = Highscore.where(
          :game_id => user_hscore.game_id).order(
          score: :desc, updated_at: :asc)

    #finds where the users.id is and returns its index
    #Index in array is the players rank + 1
    rank = rank_array.find_index { |score| score.id == user_hscore.id }
    rank += 1

    user_hscore.rank = rank
    user_hscore.save

  end


end
