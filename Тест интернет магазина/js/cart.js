var cart = {}; //корзина


$.getJSON('goods.json', function (data) {
    var goods = data; //все товары в массиве
    // console.log(goods);
    checkCart();
    //console.log(cart);
    showCart(); //визуализирую корзину

function showCart() {
		if ($.isEmptyObject(cart)) {
     var out = 'В Вашей корзине пусто';
	$('#my-cart').html(out);		
}else {
		var out = '';
        for (var key in cart) {
            out += '<button class="delete" data-art = "'+key +'">x</button>';
            out += '<img src="'+goods[key].image+'" width="100">';
            out += goods[key].title;
            out += '<button class="minus" data-art = "'+key +'">-</button>';
            out += cart[key];
            out += '<button class="plus" data-art = "'+key +'">+</button>';
            out += cart[key]*goods[key].prise;
            out +='<br>';
		}
        $('#my-cart').html(out);
		$('.plus').on('click', plusGoods);
        $('.minus').on('click', minusGoods);
        $('.delete').on('click', deleteGoods);
	}
}	
	function plusGoods(){
        var articul = $(this).attr('data-art');
        cart[articul]++;
        saveCartToLS(); //сохраняю корзину в localStorage
        showCart();
    }
	
function minusGoods(){
        var articul = $(this).attr('data-art');
        if (cart[articul]>1) {
            cart[articul]--;
        }
        else {
            delete cart[articul];
        }
        saveCartToLS();//сохраняю корзину в localStorage
        showCart();
    }

    function deleteGoods(){
        var articul = $(this).attr('data-art');
        delete cart[articul];
        saveCartToLS();//сохраняю корзину в localStorage
        showCart();
    }
});

function checkCart() {
    //проверяю наличие корзины в localStorage;
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}

function saveCartToLS(){
    localStorage.setItem('cart', JSON.stringify(cart) );
}
