
function getSubTotal(cartItem,items){
    var item = findItembyBarcode(cartItem.barcode,items);
    return item.price*cartItem.count;
}

function createCartItem(barcode,count){
    var cartItem = {};
    cartItem.barcode = barcode;
    cartItem.count = count;
    return cartItem;
}

function addToReceipts(receipt,receipts){
    receipts.push(receipt);
    setObjectFromLocalStorage('receipts',receipts)
}

function getReceipt(){
    var cartItems = getObjectFromLocalStorage('cart');
    var total = getTotal(getCartItems(getObjectFromLocalStorage('cart')));
    var receipt = {};
    receipt.carItems = cartItems;
    receipt.total = total;
    receipt.id = getObjectFromLocalStorage('receipts').length;
    receipt.date = getCurrentDate();
    return receipt;
}

function refreshCartPage(){
    var total = getTotal(getCartItems(getObjectFromLocalStorage('cart')));
    $("[name='checkout-total']").text('Check Out : ' + formatNumber(total));
    initData();
}

function updateCartItem(cartItem,cart){
    var newCartItem = [];
    cart.forEach(function(element){
        if (element.barcode === cartItem.barcode) {
            newCartItem.push(cartItem);
        }else {
            newCartItem.push(element);
        }
    });
    return newCartItem;
}

function loadCartItems(){
    var cartItems = getCartItems(getObjectFromLocalStorage('cart'));
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
    strHtml += '<td class="col-xs-2 text-center">' + cartItem.item.name + '</td>';
    strHtml += '<td class="col-xs-3 text-center">' + cartItem.item.price + '(元)/' + cartItem.item.unit + '</td>';
    strHtml += '<td class="col-xs-3 text-center">' +
        '<div class="input-group">' +
        '<input type="text" class="form-control" name="input-count" data-itemid = "' + cartItem.item.barcode + '" value="' + cartItem.count + '">' +
        '<span class="input-group-addon">' + cartItem.item.unit + '</span>' +
        '</div>' + '</td>';
    var subcost = cartItem.item.price*cartItem.count;
    strHtml += '<td class="col-xs-3 col-xs-offset-5 text-center" name="'+ cartItem.item.barcode +'">' + formatNumber(subcost) + '(元)</td>';
    strHtml += '<td class="col-xs-2 text-center"><button type="button" data-ItemID = "' + cartItem.item.barcode + '" class="btn btn-warning" name="delete-from-cart" >Delete</button></td>';
    strHtml += '</tr>';
    return strHtml;
}