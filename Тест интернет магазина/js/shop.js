var cart = {}; //корзина



//после загрузки DOM 
$('document').ready(function(){
	loadgoods();//загружаю товары из файла "goods.json"
	checkCart();//если в localStorage что-то есть - вывожу это в блок корзины
    showMiniCart();//визуализирую корзину
});

//данные из файла "goods.json" считываю в переменную data; объявляю пустую строку, складываю туда нужные атрибуты из массива data[key], затем вывожу строку в #goods)
function loadgoods(){
	$.getJSON( "goods.json", function(data){
		var out = '';
		for (var key in data){
            out+='<div class="item">';
			out+='<img src="'+data[key].image+'" alt = "">';
            out+='<h3>'+data[key]['title']+'</h3>';
            out+='<p>Цена: '+data[key]['prise']+' $</p>';
            out+='<button class = "btn_add-to-cart"  data-art = "'+ key+'">Купить</button>';
            out+='</div>';
        }
        $('#goods').html(out);
		
//если произошло событие - клик по кнопке, выполняю функцию добавления товара в корзину
		$('button.btn_add-to-cart').on('click', addToCart);
    })
}


//добавляю товар в корзину
function addToCart() {
    var articul = $(this).attr('data-art');
    if (cart[articul]!=undefined) {
        cart[articul]++;
    }
    else {
        cart[articul] = 1;
    }
	localStorage.setItem('cart', JSON.stringify(cart) );
    console.log(cart);
    showMiniCart();
  }

function showMiniCart(){
    //показываю содержимое корзины
    var out ='';
    for (var key in cart){
        out += key + ' --- '+cart[key]+'<br>';
    }
    $('#mini-cart').html(out);
}

function checkCart(){
    //проверяю наличие корзины в localStorage;
    if ( localStorage.getItem('cart') != null) {
        cart = JSON.parse (localStorage.getItem('cart'));
    }
}

