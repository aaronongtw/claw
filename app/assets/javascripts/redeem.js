var gData
var redeemList = function() {

    $.ajax({
        url: '/uservouchers',
    }).done(function(data) {
        $('#gameBox').append('<div id="redeem-list"></div>')
        RedeemData = data.filter(function(el) {
            return el.client_id != 4
        });
        for (var i = 0; i < RedeemData.length; i += 1) {
            $('#redeem').append('<div id=' + RedeemData[i].id + ' class="redeemIt">' + RedeemData[i].name + ' ' + RedeemData[i].description + '</div>')
        }
        DigitalData = data.filter(function(el) {
            return el.client_id == 4
        })
        for (var i = 0; i < DigitalData.length; i += 1) {
            $('#redeem').append('<img src="assets/prizes/' + DigitalData[i].textstuff + '">' + '<div id=' + DigitalData[i].id + '>' + DigitalData[i].name + ' ' + DigitalData[i].description + '</div>')
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

