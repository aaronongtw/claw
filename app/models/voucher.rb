class Voucher < ActiveRecord::Base

   belongs_to :client

   belongs_to :user
end
