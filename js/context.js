var isProductPage = $('div').hasClass('ProductDetail');
var storedProducts = JSON.parse(localStorage.getItem('stored-products')) || [];
var init = function () {
    productStoreMangement();
    if(storedProducts && isProductPage){
        showTemplate();
    }
    if(storedProducts.length > 3){
        initSlider();
    }
}
// Data Storage
var productStoreMangement = function () {
    if (isProductPage) {
        var price = $('.Price').text();
        var name = $('.ProductHeader').text();
        var productCode = $('.PrdouctCode').text();
        var imgUrl=$('.ImgArea.slick-current').attr('href');
        var product = {
            name: name,
            price: price,
            id: productCode,
            img:imgUrl
        }
        var productCanStore = true;

        for(var i=0; i<storedProducts.length; i++){
            var productId = storedProducts[i].id;

            if( productId === productCode) {
                productCanStore = false
            }
        }
        // storedProducts.forEach(function (item, index) {
        //     if (item.id === productCode) {
        //         productCanStore = false;
        //     }
        // })

        if(storedProducts.length > 5 && productCanStore){
            storedProducts.shift();
        }

        if (!productCanStore) {
            console.log('Product Already Stored !!');
        } else {
            storedProducts.push(product);
            localStorage.setItem('erman-product', JSON.stringify(storedProducts));
        }
    }
};
    
//Products static shown
function showTemplate() {
    $('body').append('<div id="main-container">');
    $('#main-container').append('<div id="side-container1" >');
    $('#main-container').append('<div id="side-container2" style="width:200px">');
    $('#side-container2').append('<div id="product-info"></div>');
    $('#side-container1').append('<div id="quit">X');
    $('#product-info').append('<div id="items"></div>');
    $('#items').append('<div id="item-list">');

    storedProducts.forEach(function(item, index){
        console.log(item);
        $('#item-list').append(
            '<div class="item-container">'+
                '<div class="item-name">' + item.name + '</div>' +
                '<img class="item-img" src="'+ item.img +'">'+
                '<div class="item-price blink">'+ item.price+'</div>'+
            '</div>'
        )
    });
}

// Product slider
function initSlider() {
    $('#quit').before('<div class="up-arrow"><span id="up">⯅<span></div>');
    $('#quit').after('<div class="down-arrow"><span  id="down">⯆</span></div>');
    
    var toplamDiv= $('#item-list > div').length;
    var click=toplamDiv-3;
    var divHeight=200;
    var toplamHeight = divHeight * toplamDiv;
    var toplamHeight=divHeight*toplamDiv;
    var divDeger = 0;
    
    $('#item-list').css('height', toplamHeight + 'px');

    // down button passive
    if (divDeger == 0 ) {
        $('#down').hide();
        $('#up').show();
    }
    $('#quit').click(function(){
        $('#main-container').hide();
    });
    // up click event
    $('#up').click(function(){
        if(divDeger < click){
            $('#down').show();
            divDeger++;
            upHeight = divHeight* divDeger;
            var currentTrans=$('#item-list').css('transform','translateY(-'+ upHeight+'px').css('transition-duration', '1s');
        }
        if(divDeger == click){
            $('#up').hide();
            $('#down').show();
        }
    });
        
    // down click event  
    $('#down').click(function(){
        if(divDeger > 0){
            $('#up').show();
            divDeger -- ;
            downHeight=divHeight*divDeger;
            $('#item-list').css('transform','translateY(-'+ downHeight+'px');
        }
        if (divDeger == 0 ) {
            $('#down').hide();
            $('#up').show();
        }
    });
}
init();
