class Client <ActiveRecord::Base
   has_many :vouchers
   has_and_belongs_to_many :games
end
