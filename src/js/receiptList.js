$( document ).ready(function() {
    initData();
    var strHtml = loadReceipts(JSON.parse(localStorage.receipts));
    $("tbody").html(strHtml);
    $("[name='receipt-details']").click(function() {
        var id = $(this).data('receiptid');
        localStorage.setItem('temple-receipt',JSON.stringify(findReceiptFromId(id)));
        window.location.replace("/receipt.html");
    });
    $("[name='home']").click(function() {
        window.location.replace("/");
    });
    $("[name='cart']").click(function() {
        window.location.replace("/cart.html");
    });
});

function loadReceipts(receipts){
    var html = '';
    receipts.forEach(function(element){
        html += getReceiptHtml(element);
    })
    return html;

}

function getReceiptHtml(receipt){
    var strHtml = "";
    strHtml += '<tr>';
    strHtml += '<td class="text-center">' + receipt.id + '</td>';
    strHtml += '<td class="text-center">' + formatNumber(receipt.total) + '(元)</td>';
    strHtml += '<td class="text-center">' + receipt.date + '</td>';
    strHtml += '<td class="text-center"><button type="button" data-receiptid = "' + receipt.id + '" class="btn btn-success" name="receipt-details" >Detail</button></td>';
    strHtml += '</tr>';
    return strHtml;
}