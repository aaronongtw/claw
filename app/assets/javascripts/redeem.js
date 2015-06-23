var gData
var redeemList = function() {

    $.ajax({
        url: '/uservouchers',
    }).done(function(data) {
        $('#gameBox').append('<div id="redeem-list"></div>')
        RedeemData = data.filter(function(el) {
            return el.client_id != GMID
        });
        for (var i = 0; i < RedeemData.length; i += 1) {
            $('#redeem').append('<div id=' + RedeemData[i].id + ' class="redeemIt">' + RedeemData[i].name + ' ' + RedeemData[i].description + '</div>')
        }
        DigitalData = data.filter(function(el) {
            return el.client_id == GMID
        })
        gData = DigitalData
<<<<<<< HEAD
        $('#redeem').append('<div id="dPrizes"><div id="teddy" class="dPrize"></div><div id="rubber" class="dPrize"></div><div id="clover" class="dPrize"></div><div id="glasses" class="dPrize"></div><div id="kitty" class="dPrize"></div><div id="boot" class="dPrize"></div><div id="sock" class="dPrize"></div><div id="cursed" class="dPrize"></div><div id="cactus" class="dPrize"></div></div>')
=======
        $('#redeem').append('<div id="dPrizes"><div id="teddy" class="dPrize"></div><div id="rubber" class="dPrize"></div><div id="lucky" class="dPrize"></div><div id="witwicky" class="dPrize"></div><div id="kitty" class="dPrize"></div><div id="dirty" class="dPrize"></div><div id="smelly" class="dPrize"></div><div id="cursed" class="dPrize"></div><div id="cactus" class="dPrize"></div></div>')
>>>>>>> ec0653c60a0e0a74253a153d23792ceb72414b48
        for (var i = 0; i < DigitalData.length; i += 1) {
           $caller = '#' + DigitalData[i].name.split(' ')[0].toLowerCase()
           $($caller).css('-webkit-filter', 'grayscale(0)')
           $($caller).css('opacity', '1')           
        }
    }).done(function(){
    $('.redeemIt').click(function(e) {
        voucherItem(e)
    })
    })
}

var voucherItem = function(e) {
    var data = {
        voucher: {
            vID: e.currentTarget.attributes.id.value
        }
    }

    $.ajax({
        url: '/voucheritem',
        method: 'post',
        data: data
    }).done(function(data) {
        $('#gameBox').html  ('<div id='+ data.id +' class="voucher"></div>')
        $('.voucher').append('<h3>'+ data.name+ '</h3>' + '<button id ="redeemItem">REDEEM</button>')
    }).done(function(){
    $('#redeemItem').click(function(e) {
        redeemItem(e)
    })
    })
}

var redeemItem = function(e) {
    var data = {
        voucher: {
            vID: $('.voucher').attr('id')
        }
    }

    $.ajax({
        url: '/redeemitem',
        method: 'post',
        data: data
    }).done(location.reload())
}

