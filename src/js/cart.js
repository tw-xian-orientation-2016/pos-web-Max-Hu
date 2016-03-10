$( document ).ready(function() {
    initData();
    refreshCartPage();
    $("tbody").html(loadCartItems());
    $("[name='home']").click(function() {
        window.location.replace("/");
    });
    $("[name='receipts']").click(function() {
        window.location.replace("/receiptList.html");
    });
    $("[name='input-count']").on('input', function (){
        var count;
        if ($(this).val() != '') {
            count = $(this).val();
        } else {
            count = 1;
        }
        var cartItem = createCartItem($(this).data('itemid'),count);
        var newCart = updateCartItem(cartItem,getObjectFromLocalStorage('cart'));
        setObjectFromLocalStorage('cart',newCart);
        $("[name='" + cartItem.barcode + "']").text(formatNumber(
                getSubTotal(cartItem,getObjectFromLocalStorage('items'))) + '(元)');
        refreshCartPage();
    });
    $("[name='delete-from-cart']").click(function() {
        var barcode = $(this).data('itemid');
        $(this).parents("tr").remove();
        var cartItems = removeItembyBarcode(barcode,getObjectFromLocalStorage('cart'));
        setObjectFromLocalStorage('cart',cartItems);
        initData();
        refreshCartPage();
    });

    $("[name='checkout-total']").click(function() {
        var receipt = getReceipt();
        addToReceipts(receipt,getObjectFromLocalStorage('receipts'));
        setObjectFromLocalStorage('temple-receipt',receipt);
        window.location.replace("/receipt.html");
        localStorage.removeItem('cart');
    });
});
