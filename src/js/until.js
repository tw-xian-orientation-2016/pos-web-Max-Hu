function initData(){
    if (localStorage.cart === undefined) {
        localStorage.setItem('cart','[]');
    }
    if (localStorage.receipts === undefined) {
        localStorage.setItem('receipts','[]');
    }
    if (localStorage.items === undefined) {
        $.getJSON( 'data/Items.json', function( data ) {
            localStorage.setItem("items",JSON.stringify(data));
        });
    }
    $("[name='cart-length']").text(JSON.parse(localStorage.cart).length);
    $("[name='receipt-length']").text(JSON.parse(localStorage.receipts).length);
}

function formatNumber(number) {
    return parseFloat(number).toFixed(2);
}

function findReceiptFromId(id){
    var receipt;
    var receipts = JSON.parse(localStorage.getItem('receipts'));
    receipts.forEach(function(element){
        if (element.id === id) {
            receipt = element;
        }
    })
    return receipt;
}

function findItembyBarcode(barcode,items){
    var item;
    items.forEach(function(element){
        if (element.barcode === barcode) {
            item = element;
        }
    })
    return item;
}
function removeItembyBarcode(barcode,items){
    var result = [];
    items.forEach(function(element){
        if (element.barcode != barcode) {
            result.push(element);
        }
    })
    return result;
}

function getCartItems(cart){
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