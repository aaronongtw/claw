var glowOn;

$(document).ready(function() {

    claw();

    var pollCoin = {};

    pollCoin.checkCoin = function(){
      setTimeout(pollCoin.pollServer, 600000);
    };

    pollCoin.pollServer = function(){

        $.ajax({
            url: '/users/1.json',
            method: 'GET'

        }).done(function(data) {
          pollCoin.updateCoin(data.coins);
          pollCoin.checkCoin();
        });

    }

    pollCoin.updateCoin = function(coin){
        
        if (parseInt($('#coinForUser').html().split(' ')[0]) != coin){
          var pluralcoin;
              if (coin === 1) {
                  pluralcoin = 'coin'
              } else {
                  pluralcoin =  'coins'
              }
          $('#coinDisplay').html('<h5 id="coinForUser" class="tlt">' + coin + ' ' + pluralcoin + '</h5>')

          $('.tlt').textillate({ in: { effect: 'bounce', sync:true, } });

          glowButton();
        }
    }
    
    var clawHere = $('#moveClawGrab');

    if(clawHere.length){
      if ( parseInt($('#coinForUser').html().split(' ')[0]) ) {glowButton()};

      pollCoin.checkCoin();
    }

});
