var game = game || {}

game.beans = function() {


    var game = new Phaser.Game(400, 600, Phaser.AUTO, 'bean', { preload: preload, create: create, update: update });


    function preload() {

        game.load.image('sky', '../assets/beans/sky.png');
        game.load.image('ground', '../assets/beans/platform.png');
        game.load.image('star', '../assets/beans/star.png');
        game.load.spritesheet('dude', '../assets/beans/dude.png', 60, 60);

    }

    var player;
    var platforms;
    var cursors;
    var score = 0;
    var scoreText;
    var stars;
    var ground;
    var beanFall;
    var miss = 0;
    var beanbeantime;

    function create() {

        //  We're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //  A simple background for our game
        game.add.sprite(0, 0, 'sky');

        // Here we create the ground.
        ground = game.add.sprite(0, game.world.height - 1, 'ground');

        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        ground.scale.setTo(2, 2);

        //  This stops it from falling away when you jump on it
        //ground.body.immovable = true;

        game.physics.arcade.enable(ground);


        // The player and its settings
        player = game.add.sprite(50, game.world.height - 100, 'dude');




        //  We need to enable physics on the player
        game.physics.arcade.enable(player);

        //  Player physics properties. Give the little guy a slight bounce.
        player.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

        //  Finally some stars to collect
        stars = game.add.group();

        //  We will enable physics for any star that is created in this group
        stars.enableBody = true;

        //  Our controls.
        cursors = game.input.keyboard.createCursorKeys();


        //  The score
        scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });


        


    }





    function update() {

        //  Collide the player and the stars with the platforms
        game.physics.arcade.collide(player, platforms);
        //game.physics.arcade.collide(stars, platforms);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        // This will be beans.
        game.physics.arcade.overlap(player, stars, collectStar, null, this);

        // Collect Missed.
        game.physics.arcade.overlap(ground, stars, collectMissed , null, this);
        
        // // Collect other objects.
        // game.physics.arcade.overlap(ground, stars, collectStar, null, this);
        
        // // Collect other objects.
        // game.physics.arcade.overlap(ground, stars, collectStar, null, this);





        //  Reset the players velocity (movement)
        player.body.velocity.x = 0;

        if (cursors.left.isDown)
        {
            //  Move to the left
            player.body.velocity.x = -150;

            player.animations.play('left');
        }
        else if (cursors.right.isDown)
        {
            //  Move to the right
            player.body.velocity.x = 150;

            player.animations.play('right');
        }
        else
        {
            //  Stand still
            player.animations.stop();

            player.frame = 4;
        }
        
        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && player.body.touching.down)
        {
            player.body.velocity.y = -350;
        }

        

        



    }

    function collectStar (player, star) {
        
        // Removes the star from the screen
        star.kill();


        score += 10;
        scoreText.text = 'Score: ' + score;



    }

    function collectMissed (ground, star) {
        star.kill();
        miss += 1
        console.log('miss' + miss)
        if (miss >= 5) {
            clearTimeout(beanbeantime)
        }

    }

    function createBeans() {

    console.log('create beans');
    //  Here we'll create 12 of them evenly spaced apart
            i = Math.ceil(Math.random() * 8)

            //  Create a star inside of the 'stars' group
            // i randomized by 50, 
            var star = stars.create(i * 40, -20, 'star');

            //  Let gravity do its thing
            star.body.gravity.y = 100;
            randomCreateBean();
    }

    var randomCreateBean = function() {
        beanbeantime = setTimeout(function() {
            createBeans()}, Math.random() * 2000)
        }


    var resetGame = function () {
        $('#scoreboard').css('display','none');       
    }

    randomCreateBean();


    $('#scoreboard').on('click', resetGame);




}