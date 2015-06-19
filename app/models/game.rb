class Game <ActiveRecord::Base
   has_many :highscores

   has_and_belongs_to_many :clients

   has_and_belongs_to_many :users
end
