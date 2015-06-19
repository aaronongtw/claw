system('rails g scaffold client name:string location:text type:string latitude:float longitude:float ')
system('rails g scaffold game name:string highscore:text ')
system('rails g scaffold voucher name:string description:text expiry:datetime client_id:integer textstuff:text user_id:integer ')
system('rails g scaffold user email:string username:string admin:boolean location:string coins:integer latitude:float longitude:float password_digest:string ')
system('rails g scaffold highscore user_id:integer game_id:integer score:integer ')

          File.open('app/models/client.rb', 'w') do |file|
            file.puts('class Client <ActiveRecord::Base')
file.puts('   has_many :vouchers')
file.puts('   has_and_belongs_to_many :games')
file.puts('end')
end

          File.open('app/models/game.rb', 'w') do |file|
            file.puts('class Game <ActiveRecord::Base')
file.puts('   has_many :highscores')
file.puts('end')
end

          File.open('app/models/user.rb', 'w') do |file|
            file.puts('class User <ActiveRecord::Base')
file.puts('   has_and_belongs_to_many :games')
file.puts('   has_many :highscores')
file.puts('   has_many :vouchers')
file.puts('end')
end

          file = File.read('app/models/voucher.rb')
          filtered = file.gsub(/end/, '')
          File.open('app/models/voucher.rb', 'w') do |f|
            f.write(filtered)
          end
          File.open('app/models/voucher.rb', 'a') do |l|l.puts('   belongs_to :client')
l.puts('end')
end
system('rails generate migration create_client_game client_id:integer game_id:integer') 

          file = File.read('app/models/game.rb')
          filtered = file.gsub(/end/, '')
          File.open('app/models/game.rb', 'w') do |f|
            f.write(filtered)
          end
          File.open('app/models/game.rb', 'a') do |l|l.puts('   has_and_belongs_to_many :clients')
l.puts('end')
end

          file = File.read('app/models/highscore.rb')
          filtered = file.gsub(/end/, '')
          File.open('app/models/highscore.rb', 'w') do |f|
            f.write(filtered)
          end
          File.open('app/models/highscore.rb', 'a') do |l|l.puts('   belongs_to :game')
l.puts('end')
end
system('rails generate migration create_game_user user_id:integer game_id:integer') 

          file = File.read('app/models/game.rb')
          filtered = file.gsub(/end/, '')
          File.open('app/models/game.rb', 'w') do |f|
            f.write(filtered)
          end
          File.open('app/models/game.rb', 'a') do |l|l.puts('   has_and_belongs_to_many :users')
l.puts('end')
end

          file = File.read('app/models/highscore.rb')
          filtered = file.gsub(/end/, '')
          File.open('app/models/highscore.rb', 'w') do |f|
            f.write(filtered)
          end
          File.open('app/models/highscore.rb', 'a') do |l|l.puts('   belongs_to :user')
l.puts('end')
end

          file = File.read('app/models/voucher.rb')
          filtered = file.gsub(/end/, '')
          File.open('app/models/voucher.rb', 'w') do |f|
            f.write(filtered)
          end
          File.open('app/models/voucher.rb', 'a') do |l|l.puts('   belongs_to :user')
l.puts('end')
end
system('rake db:create')
system('rake db:migrate')