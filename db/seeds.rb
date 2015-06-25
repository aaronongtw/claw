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

g1 = Game.create(name: 'Fluffy Gelato', highscore: "Strawby has escaped the Gelato Shop in search of a better home. Strangely enough, Strawby's escape path requires her to fly between pipes. Strangely enough, Gelatos can fly. Tap the window or tap the spacebar to keep the Gelato in the air. Fly through as many pipes as possible without crashing.")
g2 = Game.create(name: 'Taco Fishing', highscore: 'In a quiet lake near Mexico, Ola Kitty was seen contaminating the water with hot sauce. Now, all the fish in the lake has turned to tacos. Catch as many tacos as possible. When the taco is out of the water. Hit the white button to catch the taco. A ghost taco going to heaven is an indication that you caught a taco. Miss 5 times and you will lose.')
g3 = Game.create(name: 'Slide n Stack', highscore: "Nandos just introduced a new food preparation policy which involves timing the stack of a burger. No matter how horizontally stacked the burger is, they still manage to stay vertically aligned in some magical way. Click the game window to see some magic.")
g4 = Game.create(name: 'Bean Drop', highscore: "What would be impossible to put in a cup? A grandmother. Thats why you drag the cup around with your mouse to catch the coffee beans instead. This new cafe insists that drinking freshly roasted coffee beans is better than actually drinking coffee. Miss one bean and you're fired.")

c1 = Client.create(name: 'Baker Bros', location: 'Shop 1 56-58 York St Sydney NSW 2000', clienttype: 'Cafe')

c2 = Client.create(name: 'Claw of Noms', location: 'omnipresent', clienttype: 'Game Master')

c3 = Client.create(name: 'Gelato Messina', location: '80 Pyrmont St Pyrmont NSW 2009', clienttype: 'Ice Cream Bar')
c4 = Client.create(name: "Mary's Burger", location: '154 Castlereagh St Sydney NSW', clienttype: 'Burger Parlour')
c5 = Client.create(name: 'Contrabando', location: '21 Bent St Sydney NSW', clienttype: 'Bar')
c6 = Client.create(name: 'El Loco', location: '111 Sussex St Sydney NSW', clienttype: 'Restaurant')

vbb0 = Voucher.create(name: 'Free Coffee')
vbb1 = Voucher.create(name: 'Parmeson Egg Roll 1/2 Price')
vgm0 = Voucher.create(name: 'Buy One Scoop get your second free')
vgm1 = Voucher.create(name: 'Buy Twenty Scoops and get one free')
vmb0 = Voucher.create(name: 'Get a burger and get fries and thick shake with that!')
vbm1 = Voucher.create(name: 'Second burger free')
vc0 = Voucher.create(name: 'Taco for $3')
vc1 = Voucher.create(name: 'All you can eat Taco for $15')
vel0 = Voucher.create(name: 'Get a free Margharita with your meal')
vel1 = Voucher.create(name: 'Get your second taco for free')

c1.vouchers << vbb0 << vbb1
c3.vouchers << vgm0 << vgm1
c4.vouchers << vmb0 << vbm1
c5.vouchers << vc0 << vc1
c6.vouchers << vel0 <<vel1


v1 = Voucher.create(name: 'Teddy Bear', textstuff: 'teddy.png')
v2 = Voucher.create(name: 'Rubber Duck', textstuff: 'duck.png')
v3 = Voucher.create(name: 'Dirty Old Boot', textstuff: 'boot.png')
v4 = Voucher.create(name: 'Ola Kitty', textstuff: 'kitty.png')
v5 = Voucher.create(name: 'Cactus', textstuff: 'cactus.png')
v6 = Voucher.create(name: 'Cursed Watch', textstuff: 'watch.png')
v7 = Voucher.create(name: 'Witwicky Glasses', textstuff: 'glasses.png')
v9 = Voucher.create(name: 'Lucky Clover', textstuff: 'clover.png')
v10 = Voucher.create(name: 'Smelly Sock', textstuff: 'sock.png')


c2.vouchers << v1 << v2 << v3 << v4 << v5 << v6 << v7 << v9 << v10

hs1flap = Highscore.create(score: 20)
hs2flap = Highscore.create(score: 14)
hs3flap = Highscore.create(score: 12)
hs4flap = Highscore.create(score: 10)
hs5flap = Highscore.create(score: 8)

hs1slide = Highscore.create(score: 450)
hs2slide = Highscore.create(score: 400)
hs3slide = Highscore.create(score: 350)
hs4slide = Highscore.create(score: 300)
hs5slide = Highscore.create(score: 270)

hs1taco = Highscore.create(score: 14)
hs2taco = Highscore.create(score: 13)
hs3taco = Highscore.create(score: 12)
hs4taco = Highscore.create(score: 11)
hs5taco = Highscore.create(score: 10)

hs1bean = Highscore.create(score: 300)
hs2bean = Highscore.create(score: 270)
hs3bean = Highscore.create(score: 260)
hs4bean = Highscore.create(score: 250)
hs5bean = Highscore.create(score: 240)


g1.highscores << hs1flap << hs2flap << hs3flap << hs4flap << hs5flap
g2.highscores << hs1taco << hs2taco << hs3taco << hs4taco << hs5taco
g3.highscores << hs1slide << hs2slide << hs3slide << hs4slide << hs5slide
g4.highscores << hs1bean << hs2bean << hs3bean << hs4bean << hs5bean



u1 = User.create(email: 'admin@site', password: "password", admin: true, coins: 50)


u1.vouchers << vbb0 << v1 << v2 <<vel0
