var gData
var redeemList = function() {





  

  $.ajax({
            url: '/uservouchers',
        }).done(function(data) { 
            $('#gameBox').append('<div id="redeem-list"></div>')
            RedeemData = data.filter(function (el) {
              return el.client_id != 4
            });
              for (var i = 0 ; i < RedeemData.length; i += 1){
                 $('#redeem').append('<div id='+ RedeemData[i].id +'>' + RedeemData[i].name + ' ' + RedeemData[i].description + '</div>')
              }
            DigitalData = data.filter(function (el) {
              return el.client_id == 4
            })
              for (var i = 0 ; i < DigitalData.length; i += 1){
                 $('#redeem').append('<img src="assets/prizes/'+ DigitalData[i].textstuff +'">' + '<div id='+ DigitalData[i].id +'>' + DigitalData[i].name + ' ' + DigitalData[i].description + '</div>' )
              }
            })
        }
