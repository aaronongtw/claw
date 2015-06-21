var game = game || {}

game.flappy = function() {
    ////////////////////boot/////////////////////
    function Boot() {};

    Boot.prototype = {
        preload: function() {
            this.load.image('preloader', '../assets/preloader.gif');
        },
        create: function() {
            this.game.input.maxPointers = 1;
            this.game.state.start('preload');
        }
    };

    ////////////////////menu//////////////////////
    function Menu() {}

    Menu.prototype = {
        preload: function() {

        },
        create: function() {
            // add the background sprite
            this.background = this.game.add.sprite(0, 0, 'background');

            // add the ground sprite as a tile
            // and start scrolling in the negative x direction
            this.ground = this.game.add.tileSprite(0, 400, 335, 112, 'ground');
            this.ground.autoScroll(-200, 0);

            /** STEP 1 **/
            // create a group to put the title assets in 
            // so they can be manipulated as a whole
            this.titleGroup = this.game.add.group()

            /** STEP 2 **/
            // create the title sprite
            // and add it to the group
            this.title = this.add.sprite(0, 0, 'title');
            this.titleGroup.add(this.title);

            /** STEP 3 **/
            // create the bird sprite 
            // and add it to the title group
            this.bird = this.add.sprite(200, 5, 'bird');
            this.titleGroup.add(this.bird);

            /** STEP 4 **/
            // add an animation to the bird
            // and begin the animation
            this.bird.animations.add('flap');
            this.bird.animations.play('flap', 12, true);

            /** STEP 5 **/
            // Set the originating location of the group
            this.titleGroup.x = 30;
            this.titleGroup.y = 100;

            /** STEP 6 **/
            //  create an oscillating animation tween for the group
            this.game.add.tween(this.titleGroup).to({
                y: 115
            }, 350, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

            // add our start button with a callback
            this.startButton = this.game.add.button(this.game.width / 2, 300, 'startButton', this.startClick, this);
            this.startButton.anchor.setTo(0.5, 0.5);
        },
        startClick: function() {
            // start button click handler
            // start the 'play' state
            this.game.state.start('play');
        }
    };

    /////////////////////////////////bird/////////////////////////
    var Bird = function(game, x, y, frame) {
        Phaser.Sprite.call(this, game, x, y, 'bird', frame);
        this.anchor.setTo(0.5, 0.5);
        this.animations.add('flap');
        this.animations.play('flap', 12, true);

        //this.flapSound = this.game.add.audio('flap');

        this.name = 'bird';
        this.alive = false;
        this.onGround = false;


        // enable physics on the bird
        // and disable gravity on the bird
        // until the game is started
        this.game.physics.arcade.enableBody(this);
        this.body.allowGravity = false;
        this.body.collideWorldBounds = true;


        this.events.onKilled.add(this.onKilled, this);



    };

    Bird.prototype = Object.create(Phaser.Sprite.prototype);
    Bird.prototype.constructor = Bird;

    Bird.prototype.update = function() {
        // check to see if our angle is less than 90
        // if it is rotate the bird towards the ground by 2.5 degrees
        if (this.angle < 90 && this.alive) {
            this.angle += 2.5;
        }

        if (!this.alive) {
            this.body.velocity.x = 0;
        }
    };

    Bird.prototype.flap = function() {
        if (!!this.alive) {

            //cause our bird to "jump" upward
            this.body.velocity.y = -400;
            // rotate the bird to -40 degrees
            this.game.add.tween(this).to({
                angle: -40
            }, 100).start();
        }
    };

    Bird.prototype.revived = function() {};

    Bird.prototype.onKilled = function() {
        this.exists = true;
        this.visible = true;
        this.animations.stop();
        var duration = 90 / this.y * 300;
        this.game.add.tween(this).to({
            angle: 90
        }, duration).start();
        console.log('killed');
        console.log('alive:', this.alive);
    };

    ///////////////////////////////ground///////////////

    var Ground = function(game, x, y, width, height) {
        Phaser.TileSprite.call(this, game, x, y, width, height, 'ground');
        // start scrolling our ground
        this.autoScroll(-200, 0);

        // enable physics on the ground sprite
        // this is needed for collision detection
        this.game.physics.arcade.enableBody(this);

        // we don't want the ground's body
        // to be affected by gravity or external forces
        this.body.allowGravity = false;
        this.body.immovable = true;


    };

    Ground.prototype = Object.create(Phaser.TileSprite.prototype);
    Ground.prototype.constructor = Ground;

    Ground.prototype.update = function() {

        // write your prefab's specific update code here

    };

    ////////////////////////////////pipe///////////////////////

    var Pipe = function(game, x, y, frame) {
        Phaser.Sprite.call(this, game, x, y, 'pipe', frame);
        this.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enableBody(this);

        this.body.allowGravity = false;
        this.body.immovable = true;

    };

    Pipe.prototype = Object.create(Phaser.Sprite.prototype);
    Pipe.prototype.constructor = Pipe;

    Pipe.prototype.update = function() {
        // write your prefab's specific update code here

    };

    ////////////////////////////////pipeGroup///////////////////

    var PipeGroup = function(game, parent) {

        Phaser.Group.call(this, game, parent);

        this.topPipe = new Pipe(this.game, 0, 0, 0);
        this.bottomPipe = new Pipe(this.game, 0, 440, 1);
        this.add(this.topPipe);
        this.add(this.bottomPipe);
        this.hasScored = false;

        this.setAll('body.velocity.x', -200);
    };

    PipeGroup.prototype = Object.create(Phaser.Group.prototype);
    PipeGroup.prototype.constructor = PipeGroup;

    PipeGroup.prototype.update = function() {
        this.checkWorldBounds();
    };

    PipeGroup.prototype.checkWorldBounds = function() {
        if (!this.topPipe.inWorld) {
            this.exists = false;
        }
    };


    PipeGroup.prototype.reset = function(x, y) {
        this.topPipe.reset(0, 0);
        this.bottomPipe.reset(0, 440);
        this.x = x;
        this.y = y;
        this.setAll('body.velocity.x', -200);
        this.hasScored = false;
        this.exists = true;
    };


    PipeGroup.prototype.stop = function() {
        this.setAll('body.velocity.x', 0);
    };


    ///////////////////////////////////scoreBoard/////////////////

    var Scoreboard = function(game) {

        var gameover;

        Phaser.Group.call(this, game);
        gameover = this.create(this.game.width / 2, 100, 'gameover');
        gameover.anchor.setTo(0.5, 0.5);

        this.scoreboard = this.create(this.game.width / 2, 200, 'scoreboard');
        this.scoreboard.anchor.setTo(0.5, 0.5);

        this.scoreText = this.game.add.bitmapText(this.scoreboard.width, 180, 'flappyfont', '', 18);
        this.add(this.scoreText);

        this.bestText = this.game.add.bitmapText(this.scoreboard.width, 230, 'flappyfont', '', 18);
        this.add(this.bestText);

        this.rankText = this.game.add.bitmapText(60, 200, 'flappyfont', '', 20);
        this.add(this.rankText);

        // add our start button with a callback
        this.startButton = this.game.add.button(this.game.width / 2, 300, 'startButton', this.startClick, this);
        this.startButton.anchor.setTo(0.5, 0.5);

        this.add(this.startButton);

        this.y = this.game.height;
        this.x = 0;

    };

    Scoreboard.prototype = Object.create(Phaser.Group.prototype);
    Scoreboard.prototype.constructor = Scoreboard;

    Scoreboard.prototype.show = function(scoreIn) {
        var board = this;
        var score = scoreIn;
        var name = "flappyFood"
        console.log(this);
        console.log(board);
        ////////////////////////////////////////////////////////
        //                                                    //
        //     add ajax/socekts for global score              //
        //                                                    //
        ////////////////////////////////////////////////////////
        var requestRank = function() {
            var scoreData = {  
                game:{
                    name: name,
                    highscore: score
                }

            };

            $.ajax({
                url: '/game_rank',
                method: 'POST',
                data: scoreData

            }).done(function(data){

                console.log("recieved data: " + data);

                drawScore(data);
            });
        };

        var drawScore = function(rank){
            console.log("inside score draw");
            console.log(rank);
            var coin, bestScore;
            board.scoreText.setText(score.toString());
            if (!!localStorage) {
                bestScore = localStorage.getItem('bestScore');
                if (!bestScore || bestScore < score) {
                    bestScore = score;
                    localStorage.setItem('bestScore', bestScore);
                }
            } else {
                bestScore = 'N/A';
            }

            board.bestText.setText(bestScore.toString());
            board.rankText.setText(rank);



            // if  {
            //     coin = board.game.add.sprite(-65, 7, 'medals', 1);
            // } else if (score >= 20) {
            //     coin = board.game.add.sprite(-65, 7, 'medals', 0);
            // }

            board.game.add.tween(board).to({
                y: 0
            }, 1000, Phaser.Easing.Bounce.Out, true);

            if (rank <= 10) {


                // Emitters have a center point and a width/height, which extends from their center point to the left/right and up/down
                var emitter = board.game.add.emitter(-65, 7, 400);
                board.scoreboard.addChild(emitter);
                emitter.width = 30;
                emitter.height = 30;


                //  This emitter will have a width of 800px, so a particle can emit from anywhere in the range emitter.x += emitter.width / 2
                // emitter.width = 800;

                emitter.makeParticles('particle');

                // emitter.minParticleSpeed.set(0, 300);
                // emitter.maxParticleSpeed.set(0, 600);

                emitter.setRotation(-100, 100);
                emitter.setXSpeed(0, 0);
                emitter.setYSpeed(0, 0);
                emitter.minParticleScale = 0.25;
                emitter.maxParticleScale = 0.5;
                emitter.setAll('body.allowGravity', false);

                emitter.start(false, 1000, 1000);

            }
        };

        requestRank();
    };

    Scoreboard.prototype.startClick = function() {
        this.game.state.start('play');
    };


    Scoreboard.prototype.update = function() {
        // write your prefab's specific update code here
    };

    /////////////////////////////////Play State////////////////////////

    function Play() {}
    Play.prototype = {
        create: function() {
            // start the phaser arcade physics engine
            this.game.physics.startSystem(Phaser.Physics.ARCADE);


            // give our world an initial gravity of 1200
            this.game.physics.arcade.gravity.y = 1200;

            // add the background sprite
            this.background = this.game.add.sprite(0, 0, 'background');

            // create and add a group to hold our pipeGroup prefabs
            this.pipes = this.game.add.group();

            // create and add a new Bird object
            this.bird = new Bird(this.game, 100, this.game.height / 2);
            this.game.add.existing(this.bird);



            // create and add a new Ground object
            this.ground = new Ground(this.game, 0, 400, 335, 112);
            this.game.add.existing(this.ground);


            // add keyboard controls
            this.flapKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this.flapKey.onDown.addOnce(this.startGame, this);
            this.flapKey.onDown.add(this.bird.flap, this.bird);


            // add mouse/touch controls
            this.game.input.onDown.addOnce(this.startGame, this);
            this.game.input.onDown.add(this.bird.flap, this.bird);


            // keep the spacebar from propogating up to the browser
            this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);



            this.score = 0;
            this.scoreText = this.game.add.bitmapText(this.game.width / 2, 10, 'flappyfont', this.score.toString(), 24);

            this.instructionGroup = this.game.add.group();
            this.instructionGroup.add(this.game.add.sprite(this.game.width / 2, 100, 'getReady'));
            this.instructionGroup.add(this.game.add.sprite(this.game.width / 2, 325, 'instructions'));
            this.instructionGroup.setAll('anchor.x', 0.5);
            this.instructionGroup.setAll('anchor.y', 0.5);

            this.pipeGenerator = null;

            this.gameover = false;

            this.pipeHitSound = this.game.add.audio('pipeHit');
            this.groundHitSound = this.game.add.audio('groundHit');
            this.scoreSound = this.game.add.audio('score');

        },
        update: function() {
            // enable collisions between the bird and the ground
            this.game.physics.arcade.collide(this.bird, this.ground, this.deathHandler, null, this);

            if (!this.gameover) {
                // enable collisions between the bird and each group in the pipes group
                this.pipes.forEach(function(pipeGroup) {
                    this.checkScore(pipeGroup);
                    this.game.physics.arcade.collide(this.bird, pipeGroup, this.deathHandler, null, this);
                }, this);
            }



        },
        shutdown: function() {
            this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
            this.bird.destroy();
            this.pipes.destroy();
            this.scoreboard.destroy();
        },
        startGame: function() {
            if (!this.bird.alive && !this.gameover) {
                this.bird.body.allowGravity = true;
                this.bird.alive = true;
                // add a timer
                this.pipeGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.25, this.generatePipes, this);
                this.pipeGenerator.timer.start();

                this.instructionGroup.destroy();
            }
        },
        checkScore: function(pipeGroup) {
            if (pipeGroup.exists && !pipeGroup.hasScored && pipeGroup.topPipe.world.x <= this.bird.world.x) {
                pipeGroup.hasScored = true;
                this.score++;
                this.scoreText.setText(this.score.toString());

            }
        },
        deathHandler: function(bird, enemy) {
            if (enemy instanceof Ground && !this.bird.onGround) {
                this.scoreboard = new Scoreboard(this.game);
                this.game.add.existing(this.scoreboard);
                this.scoreboard.show(this.score);
                this.bird.onGround = true;
            } else if (enemy instanceof Pipe) {

            }

            if (!this.gameover) {
                this.gameover = true;
                this.bird.kill();
                this.pipes.callAll('stop');
                this.pipeGenerator.timer.stop();
                this.ground.stopScroll();
            }

        },
        generatePipes: function() {
            var pipeY = this.game.rnd.integerInRange(-100, 100);
            var pipeGroup = this.pipes.getFirstExists(false);
            if (!pipeGroup) {
                pipeGroup = new PipeGroup(this.game, this.pipes);
            }
            pipeGroup.reset(this.game.width, pipeY);


        }
    };

    /////////////////////////////////preload////////////////////////

    function Preload() {
        this.asset = null;
        this.ready = false;
    };

    Preload.prototype = {
        preload: function() {
            this.asset = this.add.sprite(this.width / 2, this.height / 2, 'preloader');
            this.asset.anchor.setTo(0.5, 0.5);

            this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
            this.load.setPreloadSprite(this.asset);
            this.load.image('background', '../assets/background.png');
            this.load.image('ground', '../assets/ground.png');
            this.load.image('title', '../assets/title.png');
            this.load.spritesheet('bird', '../assets/bird.png', 34, 24, 3);
            this.load.spritesheet('pipe', '../assets/pipes.png', 54, 320, 2);
            this.load.image('startButton', '../assets/start-button.png');

            this.load.image('instructions', '../assets/instructions.png');
            this.load.image('getReady', '../assets/get-ready.png');

            this.load.image('scoreboard', '../assets/scoreboard.png');
            //this.load.spritesheet('medals', '../assets/medals.png',44, 46, 2);
            this.load.image('gameover', '../assets/gameover.png');
            this.load.image('particle', '../assets/particle.png');

            this.load.bitmapFont('flappyfont', '../assets/fonts/flappyfont/flappyfont.png', '../assets/fonts/flappyfont/flappyfont.fnt');

        },
        create: function() {
            this.asset.cropEnabled = false;
        },
        update: function() {
            if (!!this.ready) {
                this.game.state.start('menu');
            }
        },
        onLoadComplete: function() {
            this.ready = true;
        }
    };


    ////////////////////////Game states/////////////////////////

    var BootState = new Boot;
    var MenuState = new Menu;
    var PlayState = new Play;
    var PreloadState = new Preload;

    var game = new Phaser.Game(288, 505, Phaser.AUTO, 'flappyFood');

    // Game States
    game.state.add('boot', BootState);
    game.state.add('menu', MenuState);
    game.state.add('play', PlayState);
    game.state.add('preload', PreloadState);


    game.state.start('boot');

};
