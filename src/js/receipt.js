$( document ).ready(function() {
    initData();
    var receipt = JSON.parse(localStorage.getItem('temple-receipt'));
    $("[name='total-price']").text('Total Price : ' + formatNumber(receipt.total));
    $("#total").text('Total Price : ' + formatNumber(receipt.total));
    $("tbody").html(loadCartItemsInReceipt(receipt));
    $("[name='home']").click(function() {
        localStorage.removeItem('temple-receipt')
        window.location.replace("/");
    });
    $("[name='receipts']").click(function() {
        window.location.replace("/receiptList.html");
    });
    $("[name='cart']").click(function() {
        window.location.replace("/cart.html");
    });

});

