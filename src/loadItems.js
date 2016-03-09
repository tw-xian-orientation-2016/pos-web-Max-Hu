$( document ).ready(function() {
    $.getJSON( 'data/Items.json', function( data ) {
        localStorage.setItem("items",JSON.stringify(data));
    });
    var strHtml = loadItems();
    $("tbody").html(strHtml);

    $("[name='add_to_cart']").click(function() {
        if (localStorage.cart === undefined) {
            localStorage.setItem('cart','[]');
        }
        var cartItems = JSON.parse(localStorage.cart);
        var cartItem = createCartItem($(this).data('itemid'),1);
        localStorage.cart = JSON.stringify(updateCartItem(cartItems,cartItem));
        var cartLength = JSON.parse(localStorage.cart).length;
        $("[name='cart-length']").text(cartLength);
    });

    $("[name='cart']").click(function() {
        window.location.replace("/cart.html");

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
    var strHtml = createHtml('','','');
    items.forEach(function(item){
        strHtml += createHtml(item.name,item.price,item.barcode);
    });
    return strHtml;
}

function createHtml(name,price,id) {
    var strHtml = "";
    strHtml += '<tr>';
    strHtml += '<td>' + name + '</td>';
    strHtml += '<td>' + price + '(元)' + '</td>';
    strHtml += '<td><button type="button" data-ItemID = "' + id + '" class="btn btn-success" name="add_to_cart" >+</button></td>';
    strHtml += '</tr>';
    return strHtml;
}

