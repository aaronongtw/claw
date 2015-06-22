
var voucher = function() {
  $.ajax({
            url: '/clients/closestVoucher'
        }).done(function(data) { 
            $('.voucher').attr('class', 'voucher')
            for (var i = 0; i < data.length; i += 1) {
                var row = data[i].row;
                var col = data[i].column;
                var idFormat = '#id' + row + '_' + col;

                if (data[i].child) {
                    $(idFormat).attr('class', 'unavailable child');
                } else {
                    $(idFormat).attr('class', 'unavailable');
                }
            }
            balance = total - data.length
            view.renderInfo(balance);    
        })
}