class User <ActiveRecord::Base
   has_and_belongs_to_many :games
   has_many :highscores
   has_many :vouchers

   has_secure_password
   validates :email, :presence => true
   validates :email, :uniqueness => true
end
