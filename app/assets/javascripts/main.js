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

        var pluralcoin;
            if (coin === 1) {
                pluralcoin = 'coin'
            } else {
                pluralcoin =  'coins'
            }
        $('#coinDisplay').html('<h5 id="coinForUser">' + coin + ' ' + pluralcoin + '</h5>')
    }

    pollCoin.checkCoin();

});
