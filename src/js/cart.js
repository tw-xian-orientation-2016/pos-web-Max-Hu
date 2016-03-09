$( document ).ready(function() {
    initData();
    $("tbody").html(loadCartItems());
});

function loadCartItems(){
    var cartItems = getCartItems();
    var emptyItem;
    var strHtml = '<tr></tr>';
    cartItems.forEach(function(cartItem){
        strHtml += createCartHtml(cartItem);
    });
    return strHtml;
}

function getCartItems(){
    var cart = JSON.parse(localStorage.cart);
    var items = JSON.parse(localStorage.items);
    var cartItems = [];
    cart.forEach(function(cartItem){
        items.forEach(function(item){
            if (item.barcode === cartItem.barcode) {
                var existItem = {};
                existItem.count = cartItem.count;
                existItem.item = item;
                cartItems.push(existItem);
            }
        })
    })
    return cartItems;
}

function createCartHtml(cartItem) {
    //if (cartItem) {
    //    cartItem.item = {};
    //    cartItem.item.name = "";
    //    cartItem.item.price = "";
    //    cartItem.item.unit = "";
    //    cartItem.item.barcode = "";
    //    cartItem.count = "";
    //
    //}
    var strHtml = "";
    strHtml += '<tr>';
    strHtml += '<td class="col-xs-2">' + cartItem.item.name + '</td>';
    strHtml += '<td class="col-xs-3">' + cartItem.item.price + '(元)/' + cartItem.item.unit + '</td>';
    strHtml += '<td class="col-xs-3 col-xs-offset-2">' +
        '<div class="input-group">' +
        '<input type="text" class="form-control" placeholder="col-xs-2" name="input-count" data-ItemID = "' + cartItem.item.barcode + '" value="' + cartItem.count + '">' +
        '<span class="input-group-addon">' + cartItem.item.unit + '</span>' +
        '</div>' + '</td>';
    strHtml += '<td class="col-xs-2"><button type="button" data-ItemID = "' + cartItem.item.barcode + '" class="btn btn-warning" name="delete-from-cart" >Delete</button></td>';
    strHtml += '</tr>';
    return strHtml;
}