
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
            $('#gameBox').append('<div id="voucher-list"></div>')
              for (var i = 0 ; i < data.length; i += 1){
                 $('#voucher-list').append('<div>' + data[i].name + '</div>')
              }
            })
        }
