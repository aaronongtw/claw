var game = game || {}

game.beans = function() {

    var player;
    var platforms;
    var cursors;
    var score = 0;
    var scoreText;
    var stars;
    var ground;
    var beanFall;
    var catchBean = true;
    var beanbeantime;
    var newGame = true;
    var waitForEnd;
    var emitter;

    var game = new Phaser.Game(320, 550, Phaser.AUTO, 'bean', {
        preload: preload,
        create: create,
        update: update
    });



    function preload() {

        game.load.image('sky', '../assets/beans/sky.png');
        game.load.image('ground', '../assets/beans/platform.png');
        game.load.image('star', '../assets/beans/star.png');
        game.load.image('dude', '../assets/beans/dude.png');

    }



    function create() {

        //  We're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //  A simple background for our game
        game.add.sprite(0, 0, 'sky');

        // Here we create the ground.
        ground = game.add.sprite(0, game.world.height-2, 'ground');

        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        ground.scale.setTo(2, 2);

        //  This stops it from falling away when you jump on it
        //ground.body.immovable = true;

        game.physics.arcade.enable(ground);


        // The player and its settings
        player = game.add.sprite(game.world.width/2, 0, 'dude');

        player.inputEnabled =true;
        player.input.enableDrag();
        player.events.onDragStart.add(startDrag, this);
        player.events.onDragStop.add(stopDrag, this);


        //  We need to enable physics on the player
        game.physics.arcade.enable(player);
        player.enableBody = true;

        //  Player physics properties. Give the little guy a slight bounce.
        player.body.collideWorldBounds = true;


        //  Our two animations, walking left and right.
        //player.animations.add('left', [0, 1, 2, 3], 10, true);
        //player.animations.add('right', [5, 6, 7, 8], 10, true);

        player.body.gravity.y = 1500;

        player.body.bounce.y = .7;


        //  Finally some stars to collect
        stars = game.add.group();

        //  We will enable physics for any star that is created in this group
        stars.enableBody = true;

        emitter = game.add.emitter(0, 0, 100);
        emitter.makeParticles('star');
        emitter.gravity = 200;

        //  Our controls.
        cursors = game.input.keyboard.createCursorKeys();


        //  The score
        scoreText = game.add.text(16, 16, 'score: 0', {
            fontSize: '32px',
            fill: '#000'
        });

    }

    function startDrag(){
        if(newGame){
            $('#stackerScoreComplete').css('display', 'none');
            scoreText.text = 'Score: ' + score;
            newGame = false
            randomCreateBean();
        }
        
        player.body.moves = false;
    }

    function stopDrag(){
        player.body.moves = true;
    }


    function update() {

        //  Collide the player and the stars with the platforms
        game.physics.arcade.collide(player, platforms);
        //game.physics.arcade.collide(stars, platforms);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        // This will be beans.
        game.physics.arcade.overlap(player, stars, collectStar, null, this);

        // Collect Missed.
        game.physics.arcade.overlap(ground, stars, collectMissed, null, this);

        player.body.velocity.x = 0;


        // if (cursors.left.isDown) {
        //     //  Move to the left
        //     player.body.velocity.x = -150;

        //     player.animations.play('left');
        // } else if (cursors.right.isDown) {
        //     //  Move to the right
        //     player.body.velocity.x = 150;

        //     player.animations.play('right');
        // } else {
        //     //  Stand still
        //     player.animations.stop();

        //     player.frame = 4;
        // }

    }

    var randomCreateBean = function() {
        beanbeantime = setTimeout(function() {
            createBeans()
        }, Math.random() * 1000)
    }

    function createBeans() {
        //  Here we'll create 12 of them evenly spaced apart
        i = Math.ceil(Math.random() * 8)
        console.log(i);

        //  Create a star inside of the 'stars' group
        // i randomized by 50, 
        var star = stars.create(i * 40, -40, 'star');
        star.anchor.setTo(0.5,0.5);

        //  Let gravity do its thing
        star.body.gravity.y = 1500;
        randomCreateBean();
    }

    var gameOver = function(){
        console.log("game over")
        requestRank();
    }


    var resetGame = function() {
        score = 0;
        miss = false;
        newGame = true;
        catchBean = true;
    }


    var requestRank = function() {

        var scoreData = {
            game: {
                name: "Bean Drop",
                highscore: score
            }

        };

        $.ajax({
            url: '/game_rank',
            method: 'POST',
            data: scoreData

        }).done(function(data) {

            $('#stackerScoreComplete').css('display', 'block');
            $('#stackerScoreComplete').html('You scored ' + score +
                ' points! <br> Your best: ' + data.highestscore +
                '  <br> Rank: ' + data.rank);
            //show scoreboard and jquery funkyness code

            resetGame();
        });
    }

    function collectStar(player, star) {

        // Removes the star from the screen
        star.kill();

        if(catchBean && !newGame){
            score += 10;
            scoreText.text = 'Score: ' + score;
        }else{

        }

    }

    function collectMissed(ground, star) {
        particleBurst(star);
        star.kill();
        clearTimeout(beanbeantime);

        if(catchBean){
            waitForEnd = setTimeout( function(){
                gameOver();
            }, 1500);
        }

        catchBean = false;
    }

    function particleBurst(star){
        emitter.x = star.x;
        emitter.y = star.y + 10;

        emitter.start(true, 1500, null, 10);
    }


    $('#bean').append('<div id="stackerResults"><h5 id="stackerScoreComplete"></h5></div>');
    $('#stackerScoreComplete').css('display','none');

    $('#scoreboard').on('click', resetGame);




}
