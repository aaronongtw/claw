var gData
var redeemList = function() {
    UpdateMarq('Prize List', 'white', 'alternate')
    $.ajax({
        url: '/uservouchers',
    }).done(function(data) {
        $('#gameBox').append('<div id="redeem-list"></div>')
        gData = data
        RedeemData = data[0].filter(function(el) {
            return el.client_id != GMID
        });
        RedeemClientData = data[1].filter(function(e) {
            return e !== 'Claw of Noms'
        });
        
        for (var i = 0; i < RedeemData.length; i += 1) {
            $('#redeem').append('<div id=' + RedeemData[i].id + ' class="redeemIt">' + RedeemData[i].name + '<div class="locationIt">'+RedeemClientData[i] +'</div></div>')
        }
        DigitalData = data[0].filter(function(el) {
            return el.client_id == GMID
        })
        

        $('#redeem').append('<div id="dPrizes"><div id="teddy" class="dPrize"></div><div id="rubber" class="dPrize"></div><div id="lucky" class="dPrize"></div><div id="witwicky" class="dPrize"></div><div id="ola" class="dPrize"></div><div id="dirty" class="dPrize"></div><div id="smelly" class="dPrize"></div><div id="cursed" class="dPrize"></div><div id="cactus" class="dPrize"></div></div>')

        for (var i = 0; i < DigitalData.length; i += 1) {
           $caller = '#' + DigitalData[i].name.split(' ')[0].toLowerCase()
           $($caller).css('-webkit-filter', 'grayscale(0)')
           $($caller).css('opacity', '1')           
        }
    }).done(function(){
    $('.redeemIt').click(function(e) {
        voucherItem(e)
        UpdateMarq('Redeeming Voucher', 'lime')
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
    UpdateMarq('Voucher Redeemed', 'blue')
}

