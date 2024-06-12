export const cart = [];
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