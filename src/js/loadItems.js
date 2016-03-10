$( document ).ready(function() {
    initData();
    var strHtml = loadItems(getObjectFromLocalStorage('items'));
    $("tbody").html(strHtml);

    $("[name='add_to_cart']").click(function() {
        var barcode = $(this).data('itemid');
        var newCart = updateCart(getObjectFromLocalStorage('cart'),barcode);
        setObjectFromLocalStorage('cart',newCart);
        $("[name='cart-length']").text(getAllCartItemCount(newCart));
    });

    $("[name='cart']").click(function() {
        window.location.replace("/cart.html");
    });
    $("[name='receipts']").click(function() {
        window.location.replace("/receiptList.html");
    });
});


