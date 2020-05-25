console.log(123);
// POPOVER

$(function () {
    $('[data-toggle="popover"]').popover()
  })


// GRABBING THE ELEMENTS
let btn = document.getElementsByClassName("add-to-cart")[0];

// FUNCTIONS
function checkInternalStorage() {
    let cart = localStorage.getItem("cart");
    let cartObj;
    if(cart == null) {
        cartObj = {};
    }
    else {
        cartObj = JSON.parse(cart);
    }
    return cartObj;
}

function addToCart(){
    let id = this.id;
    let cartObj = checkInternalStorage();
    console.log(cartObj);
    if(Object.keys(cartObj).length >= 1){
    for(let key in cartObj) {
        if (key == id) {
            cartObj[id] = cartObj[id] + 1;
        }
        else {
            cartObj[id] = 1;
        }
    }
}
else {
    cartObj[id] = 1;
}
    localStorage.setItem("cart", JSON.stringify(cartObj));
    updatePopover();
}

function updatePopover() {
    let cartObj = checkInternalStorage(); 
    let datacontent = document.getElementById("navCart").getAttribute("data-content");
    console.log(datacontent.value);
    
}

// EVENT LISTENERS
btn.addEventListener("click", addToCart);

