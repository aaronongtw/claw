
var voucher = function() {

  var data = {
    client : {
    used: $('#moveClawGrab').html().split(' ')[0]
  }
  }

  $.ajax({
            url: '/closest',
            method: 'post',
            data: data
        }).done(function(data) { 
            $('#prizeBox').append('<div id="PRIZE"></div>')
            if (data.textstuff.length > 1) {
            $('#PRIZE').append('<img src ="assets/prizes/' + data.textstuff + '"></img>')
              }
            })
        }
