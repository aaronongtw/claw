# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Highscore.destroy_all
User.destroy_all
Client.destroy_all
Game.destroy_all

g1 = Game.create(name: 'flappyFood')
g2 = Game.create(name: 'fishingTaco')
g3 = Game.create(name: 'stackerBurger')
g4 = Game.create(name: 'something')

c1 = Client.create(name: 'Baker Bros', location: 'Shop 1 56-58 York St Sydney NSW 2000')

u1 = User.create(email: 'email@site', password: "password", admin: true)

