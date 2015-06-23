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
Voucher.destroy_all

g1 = Game.create(name: 'Fluffy Gelato')
g2 = Game.create(name: 'Taco Fishing')
g3 = Game.create(name: 'Slide n Stack')
g4 = Game.create(name: 'Something Else')

c1 = Client.create(name: 'Baker Bros', location: 'Shop 1 56-58 York St Sydney NSW 2000', clienttype: 'Cafe')
c2 = Client.create(name: 'Claw of Noms', location: 'omnipresent', clienttype: 'Game Master')

v0 = Voucher.create(name: 'Free Coffee')
v1 = Voucher.create(name: 'Teddy Bear', textstuff: 'teddy.png')
v2 = Voucher.create(name: 'Rubber Duck', textstuff: 'duck.png')
v3 = Voucher.create(name: 'Dirty Old Boot', textstuff: 'boot.png')
v4 = Voucher.create(name: 'Ola Kitty', textstuff: 'kitty.png')
v5 = Voucher.create(name: 'Cactus', textstuff: 'cactus.png')
v6 = Voucher.create(name: 'Cursed Watch', textstuff: 'watch.png')
v7 = Voucher.create(name: 'Witwicky Glasses', textstuff: 'glasses.png')
v9 = Voucher.create(name: 'Lucky Clover', textstuff: 'clover.png')
v10 = Voucher.create(name: 'Smelly Sock', textstuff: 'sock.png')

c1.vouchers << v0
c2.vouchers << v1 << v2 << v3 << v4 << v5 << v6 << v7 << v9 << v10

hs1flap = Highscore.create(score: 20)
hs2flap = Highscore.create(score: 14)
hs3flap = Highscore.create(score: 12)
hs4flap = Highscore.create(score: 10)
hs5flap = Highscore.create(score: 8)

hs1slide = Highscore.create(score: 280)
hs2slide = Highscore.create(score: 260)
hs3slide = Highscore.create(score: 240)
hs4slide = Highscore.create(score: 220)
hs5slide = Highscore.create(score: 200)

hs1taco = Highscore.create(score: 14)
hs2taco = Highscore.create(score: 13)
hs3taco = Highscore.create(score: 12)
hs4taco = Highscore.create(score: 11)
hs5taco = Highscore.create(score: 10)


g1.highscores << hs1flap << hs2flap << hs3flap << hs4flap << hs5flap
g2.highscores << hs1taco << hs2taco << hs3taco << hs4taco << hs5taco
g3.highscores << hs1slide << hs2slide << hs3slide << hs4slide << hs5slide




u1 = User.create(email: 'admin@site', password: "password", admin: true, coins: 50)


u1.vouchers << v0 << v1 << v2
