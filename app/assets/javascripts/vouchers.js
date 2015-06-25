var voucher = function() {

    var data = {
        client: {
            used: $('#moveClawGrab').html().split(' ')[0]
        }
    }

    $.ajax({
        url: '/closest',
        method: 'post',
        data: data
    }).done(function(data) {
        $('#prizeBox').append('<div id="PRIZE"></div>')
        if (data[0].textstuff != null) {
            $('#PRIZE').append('<img src ="assets/prizes/' + data[0].textstuff + '"></img>')
        } else {
            $('#PRIZE').append('<div id="vPrize"><h4>'+ data[0].name+'</h4></div>')
        }
        var pluralcoin;
            if (data[1] === 1) {
                pluralcoin = 'coin'
            } else {
                pluralcoin =  'coins'
            }
        $('#coinDisplay').html('<h5 id="coinForUser">' + data[1] + ' ' + pluralcoin + '</h5>')
        $('#redeemDisplay').html('<h5>' + data[2] + '</h5>')
        UpdateMarq('Congratulations, you got ' + data[0].name)
    })
}
