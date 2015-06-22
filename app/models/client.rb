class Client <ActiveRecord::Base
   has_many :vouchers
   has_and_belongs_to_many :games

   geocoded_by :location
   after_validation :geocode,
   :if => lambda{ |obj| obj.address_changed? }
end
