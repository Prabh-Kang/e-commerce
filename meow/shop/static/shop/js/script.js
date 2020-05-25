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
        
        let cartObj = checkInternalStorage();
        if (Object.keys(cartObj).includes(e.target.id)) {
            cartObj[e.target.id] += 1;
        }
        else {
            cartObj[e.target.id] = 1;
        }
        console.log(cartObj);
        localStorage.setItem("cart", JSON.stringify(cartObj));
        loadDefault(e.target);
        upadtecart();
    })
    loadDefault2(button);
}

Array.from(cartBtns).forEach(button=> {
    addToCartFunc(button);
})


function loadDefault(button) {
    let cartObj = checkInternalStorage();

        button.parentNode.innerHTML = `
        <button class="btn btn-minus btn-sm btn-primary mr-3" id="${button.id}">-</button> <span id="${button.id}">${cartObj[button.id]}</span> 
        <button class="btn btn-plus btn-sm btn-primary ml-3" id="${button.id}" >+</button>
        `
        console.log("activating plus and minus btn functions");
        
        
        plusBtnFunc(document.getElementById(`${button.id}`).parentNode.children[2]);
        minusBtnFunc(document.getElementById(`${button.id}`).parentNode.children[0]);
}
function loadDefault2(button) {
    let cartObj = checkInternalStorage();
        if(Object.keys(cartObj).includes(button.id)){
        button.parentNode.innerHTML = `
        <button class="btn btn-minus btn-sm btn-primary mr-3" id="${button.id}">-</button> <span id="${button.id}">${cartObj[button.id]}</span> 
        <button class="btn btn-plus btn-sm btn-primary ml-3" id="${button.id}" >+</button>
        `
        console.log("activating functions");
        }
}




let plusBtns = document.getElementsByClassName("btn-plus");

function plusBtnFunc(button) {

    console.log("plus button ", button);
    
    button.addEventListener("click", (button) => {
        console.log(button.target.parentNode.children[1]);
        let cartObj = checkInternalStorage();
        cartObj[button.target.id] += 1;
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
        if (cartObj[button.target.id] == 1) {
            button.target.parentNode.innerHTML = ` <button class="btn btn-primary btn-block btn-sm cart-btn" id="${button.target.id}"><span>Add To Cart </span></button>`;
            delete cartObj[button.target.id];
            localStorage.setItem("cart", JSON.stringify(cartObj));
            addToCartFunc(document.getElementById(id));
        }
        else {
            cartObj[button.target.id] -= 1;
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
    document.getElementById("cartNum").innerHTML = Object.keys(cartObj).length;
    console.log(Object.keys(cartObj).length);
    
    let i = 1;
    let html = "";
    for (let key in cartObj) {
        let name = document.getElementById("pr" + String(key)).innerText;
        let number = cartObj[key];
        html += `
            ${i} ${name} : ${number} <br>
        `
        i++;
    }
    document.getElementById("navCart").setAttribute("data-content", html);
    
}
upadtecart();