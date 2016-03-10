describe('pos', function() {

  var cart;
  beforeEach(function() {
    localStorage.clear();
    initTestEnv();
    cart = JSON.parse('[' +
        '{"barcode":"ITEM000000","count":1},' +
        '{"barcode":"ITEM000002","count":1},' +
        '{"barcode":"ITEM000001","count":7}]');

  });
  describe('items', function() {
    it('should update cart list when add item to cart', function() {
      var except = JSON.parse('[' +
          '{"barcode":"ITEM000000","count":1},' +
          '{"barcode":"ITEM000002","count":1},' +
          '{"barcode":"ITEM000001","count":8}]');

      var newcart = updateCart(cart,'ITEM000001');
      expect(except).toEqual(newcart);
    });

    it('should return count +1 when add item to cart', function() {
      var totalCount = getAllCartItemCount(cart);
      expect(9).toEqual(totalCount);
    });
  });

  describe('cart', function() {
    it('should update item correctly in cart', function() {
      var except = JSON.parse('[' +
          '{"barcode":"ITEM000000","count":1},' +
          '{"barcode":"ITEM000002","count":1},' +
          '{"barcode":"ITEM000001","count":12}]');
      var cartItem = {barcode: 'ITEM000001',count:12};
      var newCart = updateCartItem(cartItem,cart);
      expect(except).toEqual(newCart);
    });

    it('should calculate subTotal correctly', function() {
      var cartItem = {barcode: 'ITEM000001',count:12};
      var subTotal = getSubTotal(cartItem,loadAllItems());
      expect(36).toEqual(subTotal);
    });

    it('should remove item count correctly in cart', function() {
      var barcode = 'ITEM000001';
      var except = JSON.parse('[{"barcode":"ITEM000002","count":1}]')
      var cartItems = JSON.parse(localStorage.getItem('cart'));
      var result = removeItembyBarcode(barcode,cartItems);
      expect(except).toEqual(result);
    });

    it('should return correct receipt when check out', function() {
      spyOn(window, 'getCurrentDate').and.returnValues("2016年3月4日 13时23分25秒");
      var except = JSON.parse('{' +
          '"carItems":' +
          '[{"barcode":"ITEM000001","count":5},{"barcode":"ITEM000002","count":1}],' +
          '"total":20.5,' +
          '"date":"2016年3月4日 13时23分25秒",' +
          '"id":2}');
      var result = getReceipt();
      expect(except).toEqual(result);
    });

  })


});
