console.log(123);
// POPOVER

$(function () {
    $('[data-toggle="popover"]').popover()
  })

updatePopover()
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
    console.log(typeof(id));
    
        
    let product_name = this.parentNode.querySelectorAll("input")[0].getAttribute("placeholder");
    let product_price = this.parentNode.querySelectorAll("input")[1].getAttribute("placeholder");
    console.log(product_name, product_price);
    
    let cartObj = checkInternalStorage();
    // if(Object.keys(cartObj).length >= 1){ 
    //     console.log("outer if");
      let i = 0;         
    for(let key in cartObj) {
        console.log("inside for");
        
        if (key == id) {
            console.log("inside for if");
            console.log(cartObj[id]);    
            cartObj[id][0] ++;
            i ++;
            break;
        }
    }

        if(i == 0) {    
            console.log("inside else");   
            cartObj[id] = [1, product_name, product_price];
        }
    console.log("After: ", cartObj);    
    localStorage.setItem("cart", JSON.stringify(cartObj));
    updatePopover();
}

function updatePopover() {
    let cartObj = checkInternalStorage(); 
    let noOfOrders = document.getElementById("cartNum");
    let sum = 0;
    for (let key in cartObj) {
        sum+= Number(cartObj[key][0]);
    }
    noOfOrders.innerText = sum;

    let j = 1;
    let html = "";
    for (let key in cartObj) {
        let product_name= cartObj[key][1];
        let number = cartObj[key][0];
        html += `
            ${j} ${product_name} : ${number} <br>
        `
        j++;
    }
    document.getElementById("navCart").setAttribute("data-content", html);
}

// EVENT LISTENERS
btn.addEventListener("click", addToCart);

