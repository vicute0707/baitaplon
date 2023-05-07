const btn = document.querySelectorAll(".buy")
btn.forEach(function(button, index) {
    button.addEventListener("click", function(event) {
        btnItem = event.target;
        var produc = btnItem.parentElement;
        var product = produc.parentElement;
        var productImg = product.querySelector("img").src
        var producName = product.querySelector(".product-name").innerText
        var productPrice = product.querySelector(".product-price").innerText
        addcart(producName, productImg, productPrice)

    })

})

function addcart(producName, productImg, productPrice) {
    var addtr = document.createElement("tr")
    var trcontent = '<tr><td style="display: flex; align-items: center; "><img src="' + productImg + '" alt="" width="60px" >' + producName + '</td><td>' + productPrice + '</td><td><input type="number" value="1" min="0" style="width: 30px; outline: none; color: pink"></td><td style="cursor: pointer;">Xóa</td></tr>'
    addtr.innerHTML = trcontent
    var cartTable = document.querySelector("tbody")
    cartTable.append(addtr)
    carttotal()
}
function carttotal()
{

    var cartItem = document.querySelectorAll("tbody tr")
    var totalC = 0
    for (var i=0; i<cartItem.length; i++){
        var inputValue = cartItem[i].querySelector("input").value
        var productPrice =cartItem[i].querySelector("span").innerHTML
        totalA = inputValue*productPrice*1000
        totalC = totalC + totalA
        totalD = totalC.toLocaleString('de-DE')
    }
    var cartTotalA = document.querySelector(".price-total span")
    cartTotalA.innerHTML = totalD
}
$(document).ready(function() {
    $('#tuongvi .bags').click(function() {
        $('.list-giohang').slideToggle();
    });
})