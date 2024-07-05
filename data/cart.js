export let cart;

loadFromStorage();

export function loadFromStorage() {
  
  cart = JSON.parse(localStorage.getItem('cart'));
  if (!cart || cart.length === 0) {
    cart = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    }, {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    }];
    saveToStorage();
  }
}
function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart))
}
export function addToCart(productId){
    let matchingItem;
    cart.forEach((cartitem) => {
        if( productId === cartitem.productId){
            matchingItem = cartitem;
        }
    });

    let quantityselector = document.querySelector(`.js-quantity-selector-${productId}`);
    let quantity = Number(quantityselector.value);
    
    if(matchingItem){
        matchingItem.quantity += quantity;
    }else{
        cart.push({
            productId,
            quantity,
            deliveryOptionsId: '1'
        });
    }
    saveToStorage();
}
export function removeFromCart(productId){
    let newcart = [];
    cart.forEach((cartitem) =>{
        if(cartitem.productId !== productId){
            newcart.push(cartitem);
        }
    });
 cart = newcart;
 saveToStorage();

}
export function calculateCartQuantity(){
    let cartQuantity = 0;
    cart.forEach((cartitem) =>{
     cartQuantity += Number(cartitem.quantity);
    });
    return cartQuantity;
    
}
export function updateQuantity(productId, newQuantity){
    let matchingItem;
    cart.forEach((cartitem) =>{
        if(productId === cartitem.productId){
          matchingItem = cartitem;
        }
    });
    matchingItem.quantity += newQuantity;
    saveToStorage();
    console.log(matchingItem.quantity);
    return  matchingItem.quantity;
}

export function updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem;
    cart.forEach((cartitem) => {
        if( productId === cartitem.productId){
            matchingItem = cartitem;
        }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}

