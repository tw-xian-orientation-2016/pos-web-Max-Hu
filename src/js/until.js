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