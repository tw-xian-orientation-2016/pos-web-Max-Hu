$( document ).ready(function() {
    initData();
    var strHtml = loadItems();
    $("tbody").html(strHtml);

    $("[name='add_to_cart']").click(function() {
        var cartItems = JSON.parse(localStorage.cart);
        var cartItem = createCartItem($(this).data('itemid'),1);
        localStorage.cart = JSON.stringify(updateCartItem(cartItems,cartItem));
        var cartLength = JSON.parse(localStorage.cart).length;
        $("[name='cart-length']").text(cartLength);
    });

    $("[name='cart']").click(function() {
        window.location.replace("/cart.html");
    });
    $("[name='receipts']").click(function() {
        window.location.replace("/receiptList.html");
    });


});

function updateCartItem(items,item){
    var exist = false;
    items.forEach(function(existItem){
        if (existItem.barcode === item.barcode) {
            exist = true;
        }
    })
    if (!exist) {
        items.push(item);
    }
    return items;
}

function createCartItem(barcode,count){
    var cartItem = {};
    cartItem.barcode = barcode;
    cartItem.count = count;
    return cartItem;
}

function loadItems (){
    var items = JSON.parse(localStorage.items);
    var strHtml = "";
    items.forEach(function(item){
        strHtml += createHtml(item);
    });
    return strHtml;
}

function createHtml(item) {
    var strHtml = "";
    strHtml += '<tr>';
    strHtml += '<td>' + item.name + '</td>';
    strHtml += '<td>' + item.price + '(元)/' + item.unit + '</td>';
    strHtml += '<td><button type="button" data-itemid = "' + item.barcode + '" class="btn btn-success" name="add_to_cart" >+</button></td>';
    strHtml += '</tr>';
    return strHtml;
}

