export let cart = [{
    productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
    quantity: '2'
},{
    productId: `54e0eccd-8f36-462b-b68a-8182611d9add`,
    quantity: '3'
}];
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
            quantity
        });
    }
}
export function removeFromCart(productId){
    let newcart = [];
    cart.forEach((cartitem) =>{
        if(cartitem.productId !== productId){
            newcart.push(cartitem);
        }
    });
 cart = newcart;
 
}