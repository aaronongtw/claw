var gData
var redeemList = function() {





  

  $.ajax({
            url: '/uservouchers',
        }).done(function(data) { 
            $('#gameBox').append('<div id="redeem-list"></div>')
            data = data.filter(function (el) {
              return el.client_id != 4
            });
              for (var i = 0 ; i < data.length; i += 1){
                 $('#redeem').append('<div id='+ data[i].id +'>' + data[i].name + ' ' + data[i].description + '</div>')
              }
            })
        }
