$( document ).ready(function() {
    initData();
    refreshTotal();
    $("tbody").html(loadCartItems());
    $("[name='home']").click(function() {
        window.location.replace("/");
    });
    $("[name='receipts']").click(function() {
        window.location.replace("/receiptList.html");
    });
    $("[name='input-count']").on('input', function (){
        if ($(this).val() != '') {
            var cartItem = {};
            cartItem.barcode = $(this).data('itemid');
            cartItem.count = $(this).val();
            updateCartItem(cartItem);
            var item = findItembyBarcode(cartItem.barcode,JSON.parse(localStorage.items));
            var subcost = item.price*cartItem.count;
            $("[name='" + cartItem.barcode + "']").text(subcost + '(元)');
            refreshTotal();
        }
    });
    $("[name='delete-from-cart']").click(function() {
        var barcode = $(this).data('itemid');
        $(this).parents("tr").remove();
        cartItems = removeItembyBarcode(barcode,JSON.parse(localStorage.cart))
        localStorage.setItem('cart',JSON.stringify(cartItems));
        initData();
        refreshTotal();
    });

    $("[name='checkout-total']").click(function() {
        var receipt = getReceipt();
        addToReceipts(receipt);
        localStorage.setItem('temple-receipt',JSON.stringify(receipt));
        window.location.replace("/receipt.html");
        localStorage.removeItem('cart');
    });
});

function addToReceipts(receipt){
    var receipts = JSON.parse(localStorage.receipts);
    receipts.push(receipt);
    localStorage.removeItem('receipts');
    localStorage.setItem('receipts',JSON.stringify(receipts));
}

function getReceipt(){
    var cartItems = JSON.parse(localStorage.cart);
    var total = getTotal(getCartItems(JSON.parse(localStorage.cart)));
    var receipt = {};
    receipt.carItems = cartItems;
    receipt.total = total;
    receipt.id = JSON.parse(localStorage.receipts).length;
    return receipt;
}

function refreshTotal(){
    var total = getTotal(getCartItems(JSON.parse(localStorage.cart)));
    $("[name='checkout-total']").text('Check Out : ' + formatNumber(total));
}

function updateCartItem(cartItem){
    var cart = JSON.parse(localStorage.cart);
    var newCartItem = [];
    cart.forEach(function(element){
        if (element.barcode === cartItem.barcode) {
            newCartItem.push(cartItem);
        }else {
            newCartItem.push(element);
        }
    })
    localStorage.removeItem('cart');
    localStorage.setItem('cart',JSON.stringify(newCartItem));
}

function loadCartItems(){
    var cartItems = getCartItems(JSON.parse(localStorage.cart));
    var strHtml = '';
    cartItems.forEach(function(cartItem){
        strHtml += createCartHtml(cartItem);
    });
    return strHtml;
}

function getTotal(cartItems){
    var total = 0;
    cartItems.forEach(function(element){
        var subtotal = element.item.price*element.count;
        total += subtotal;
    })
    return total;
}


function createCartHtml(cartItem) {
    var strHtml = "";
    strHtml += '<tr>';
    strHtml += '<td class="col-xs-2">' + cartItem.item.name + '</td>';
    strHtml += '<td class="col-xs-3">' + cartItem.item.price + '(元)/' + cartItem.item.unit + '</td>';
    strHtml += '<td class="col-xs-3">' +
        '<div class="input-group">' +
        '<input type="text" class="form-control" name="input-count" data-itemid = "' + cartItem.item.barcode + '" value="' + cartItem.count + '">' +
        '<span class="input-group-addon">' + cartItem.item.unit + '</span>' +
        '</div>' + '</td>';
    var subcost = cartItem.item.price*cartItem.count;
    strHtml += '<td class="col-xs-3 col-xs-offset-5" name="'+ cartItem.item.barcode +'">' + formatNumber(subcost) + '(元)</td>';
    strHtml += '<td class="col-xs-2"><button type="button" data-ItemID = "' + cartItem.item.barcode + '" class="btn btn-warning" name="delete-from-cart" >Delete</button></td>';
    strHtml += '</tr>';
    return strHtml;
}