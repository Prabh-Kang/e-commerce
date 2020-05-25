console.log("Welcome to the console");

// OWL CAROUSEL JS

$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
        nav: true,
        dots: true,
        responsive: {
            0: {
                items: 1,
                dots: false
            },
            600: {
                items: 2,
                dots: true
            },
            1000: {
                items: 3,
                dots: true
            }
        }
    });
});

// POPOVER

$(function () {
    $('[data-toggle="popover"]').popover()
  })



// FETCHING THE ELEMENTS
let cartBtns = document.getElementsByClassName('cart-btn');

// CART CONTROLS


function checkInternalStorage() {
    let cart = localStorage.getItem('cart');
    let cartObj;
    if (cart == null) {
        cartObj = {};
    }
    else {
        cartObj = JSON.parse(cart);
    }
    return cartObj;

}


// ADDING THE ADD TO CART FUNCTION

function addToCartFunc(button) {
    console.log(button);
    button.addEventListener('click', (e) => {
        let btn = e.target;
        console.log(btn.id);
        let product_name= e.target.parentNode.querySelectorAll("input")[0].getAttribute("placeholder");
        let product_price= e.target.parentNode.querySelectorAll("input")[1].getAttribute("placeholder");
        console.log(product_name, product_price);
        let cartObj = checkInternalStorage();
            cartObj[e.target.id] = [1, product_name, product_price];
        console.log(cartObj);
        localStorage.setItem("cart", JSON.stringify(cartObj));
        e.target.parentNode.innerHTML = `
        <button class="btn btn-minus btn-sm btn-primary mr-3" id="${e.target.id}">-</button> <span id="${e.target.id}">${cartObj[e.target.id][0]}</span> 
        <button class="btn btn-plus btn-sm btn-primary ml-3" id="${e.target.id}" >+</button> <input type="hidden" class="prodName" placeholder="${product_name}">
        <input type="hidden" class="prodPrice" placeholder="${product_price}">`
        plusBtnFunc(document.getElementById(`${e.target.id}`).parentNode.children[2]);
        minusBtnFunc(document.getElementById(`${e.target.id}`).parentNode.children[0]);
        upadtecart();
        })
    loadDefault(button);
}

Array.from(cartBtns).forEach(button=> {
    addToCartFunc(button);
})



        
        

function loadDefault(button) {
    let cartObj = checkInternalStorage();
        if(Object.keys(cartObj).includes(button.id)){
        button.parentNode.innerHTML = `
        <button class="btn btn-minus btn-sm btn-primary mr-3" id="${button.id}">-</button> <span id="${button.id}">${cartObj[button.id][0]}</span> 
        <button class="btn btn-plus btn-sm btn-primary ml-3" id="${button.id}" >+</button> <input type="hidden" class="prodName" placeholder="{{prod.product_name}}">
        <input type="hidden" class="prodPrice" placeholder="{{prod.product_price}}">
        `
        console.log("activating functions");
        }
}




let plusBtns = document.getElementsByClassName("btn-plus");

function plusBtnFunc(button) {

    console.log("plus button ", button);
    
    button.addEventListener("click", (button) => {
        console.log(button.target.parentNode.children[1]);
        let product_name= button.target.parentNode.querySelectorAll("input")[0].getAttribute("placeholder");
        let product_price= button.target.parentNode.querySelectorAll("input")[1].getAttribute("placeholder");
        let cartObj = checkInternalStorage();
        cartObj[button.target.id][0] += 1;
        cartObj[button.target.id][1] = product_name;
        cartObj[button.target.id][2] = product_price;
        button.target.parentNode.children[1].innerHTML = Number(button.target.parentNode.children[1].innerText) + 1;
        console.log(2);
        localStorage.setItem("cart", JSON.stringify(cartObj));
        upadtecart();
    })
}

Array.from(plusBtns).forEach(button => {
    plusBtnFunc(button);
})



let minusBtns = document.getElementsByClassName("btn-minus");

function minusBtnFunc(button) {
    console.log("minus button ", button);
    button.addEventListener("click", (button) => {
        let id = String(button.target.id);
        let cartObj = checkInternalStorage();
        if (cartObj[button.target.id][0] == 1) {
            let product_name = cartObj[button.target.id][1];
            let product_price = cartObj[button.target.id][2];
            button.target.parentNode.innerHTML = ` <button class="btn btn-primary btn-block btn-sm cart-btn" id="${button.target.id}">Add To Cart</button><input type="hidden" class="prodName" placeholder="${product_name}">
            <input type="hidden" class="prodPrice" placeholder="${product_price}">`;
            delete cartObj[button.target.id];
            localStorage.setItem("cart", JSON.stringify(cartObj));
            addToCartFunc(document.getElementById(id));
        }
        else {
            cartObj[button.target.id][0] -= 1;
            button.target.parentNode.children[1].innerHTML = Number(button.target.parentNode.children[1].innerText) - 1;
            localStorage.setItem("cart", JSON.stringify(cartObj));
        }
        upadtecart();
    })
}


Array.from(minusBtns).forEach(button => {
    minusBtnFunc(button);
})


// CART OPERATIONS

function upadtecart() {
    let cartObj = checkInternalStorage();
    let noOfOrders = document.getElementById("cartNum");
    let sum = 0;
    for (let key in cartObj) {
        sum+= Number(cartObj[key][0]);
    }
    noOfOrders.innerText = sum;
    console.log(Object.keys(cartObj).length);
    
    let i = 1;
    let html = "";
    for (let key in cartObj) {
        let product_name= cartObj[key][1];
        let number = cartObj[key][0];
        html += `
            ${i} ${product_name} : ${number} <br>
        `
        i++;
    }
    document.getElementById("navCart").setAttribute("data-content", html);
    
}
upadtecart();