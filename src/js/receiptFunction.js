function loadCartItemsInReceipt(receipt) {
    var cartItems = getCartItems(receipt.carItems);
    var receiptItemsHtml = '';
    cartItems.forEach(function(element){
        receiptItemsHtml += createCartHtmlInRecepit(element);
    });
    return receiptItemsHtml
}


function createCartHtmlInRecepit(cartItem) {
    var strHtml = "";
    strHtml += '<tr>';
    strHtml += '<td >' + cartItem.item.name + '</td>';
    strHtml += '<td >' + cartItem.item.price + '(元)/' + cartItem.item.unit + '</td>';
    strHtml += '<td >' + cartItem.count + ' ' + cartItem.item.unit + '</td>';
    var subcost = cartItem.item.price*cartItem.count;
    strHtml += '<td name="'+ cartItem.item.barcode +'">' + formatNumber(subcost) + '(元)</td>';
    strHtml += '</tr>';
    return strHtml;
}