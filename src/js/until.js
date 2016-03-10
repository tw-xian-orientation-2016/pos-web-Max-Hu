function initData(){
    if (localStorage.cart === undefined) {
        initObjectFromLocalStorage('cart');
    }
    if (localStorage.receipts === undefined) {
        initObjectFromLocalStorage('receipts');
    }
    if (localStorage.items === undefined) {
        //$.getJSON( 'data/Items.json', function( data ) {
            setObjectFromLocalStorage("items",loadAllItems());
        //});
    }
    $("[name='cart-length']").text(getAllCartItemCount(getObjectFromLocalStorage('cart')));
    $("[name='receipt-length']").text(getObjectFromLocalStorage('receipts').length);
}

function formatNumber(number) {
    return parseFloat(number).toFixed(2);
}

function getAllCartItemCount(cart){
    var totalCount = 0;
    cart.forEach(function (element){
        totalCount += parseInt(element.count);
    });
    return totalCount;
}

function findReceiptFromId(id){
    var receipt;
    var receipts = getObjectFromLocalStorage('receipts');
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
    var items = getObjectFromLocalStorage('items');
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

function getObjectFromLocalStorage(key){
    return JSON.parse(localStorage.getItem(key));
}

function setObjectFromLocalStorage(key,value){
    localStorage.setItem(key,JSON.stringify(value));
}

function removeObjectFromLocalStorage(key){
    localStorage.removeItem(key);
}

function initObjectFromLocalStorage(key){
    localStorage.setItem(key,'[]');
}

function getCurrentDate(){
    var now = new Date();
    //return now.toString().substr(0,now.length-17);
    var result = now.getFullYear() + '年' + (now.getMonth()+1) + '月' +
            now.getDay() + '日 ' + now.getHours() + '时' + now.getMinutes() + '分' +
            now.getSeconds() + '秒';
    return result;

}

function loadAllItems() {
    return [
        {
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000002',
            name: '苹果',
            unit: '斤',
            price: 5.50
        },
        {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
        },
        {
            barcode: 'ITEM000004',
            name: '电池',
            unit: '个',
            price: 2.00
        },
        {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50
        }
    ];
}
