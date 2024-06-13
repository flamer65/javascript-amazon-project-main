import { cart , removeFromCart} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./util/money.js";

let cartSummary = ``;
cart.forEach((cartitem) =>{
    const productId = cartitem.productId;
   let matchitem;
   products.forEach((product)=>{
    if(product.id ===  productId){
        matchitem = product;
    }
   });
   console.log(matchitem);
cartSummary += 
`<div class="cart-item-container js-cart-item-cointainer-${matchitem.id}">
   <div class="delivery-date">
     Delivery date: Tuesday, June 21
   </div>

   <div class="cart-item-details-grid">
     <img class="product-image"
       src="${matchitem.image}">

     <div class="cart-item-details">
       <div class="product-name">
         ${matchitem.name}
       </div>
       <div class="product-price">
        ${formatCurrency(matchitem.priceCents)}
       </div>
       <div class="product-quantity">
         <span>
           Quantity: <span class="quantity-label">2</span>
         </span>
         <span class="update-quantity-link link-primary">
           Update
         </span>
         <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchitem.id}">
           Delete
         </span>             
       </div>
     </div>

     <div class="delivery-options">
       <div class="delivery-options-title">
         Choose a delivery option:
       </div>
       <div class="delivery-option">
         <input type="radio" checked
           class="delivery-option-input"
           name="delivery-option-${matchitem.id}">
         <div>
           <div class="delivery-option-date">
             Tuesday, June 21
           </div>
           <div class="delivery-option-price">
             FREE Shipping
           </div>
         </div>
       </div>
       <div class="delivery-option">
         <input type="radio"
           class="delivery-option-input"
           name="delivery-option-${matchitem.id}">
         <div>
           <div class="delivery-option-date">
             Wednesday, June 15
           </div>
           <div class="delivery-option-price">
             $4.99 - Shipping
           </div>
         </div>
       </div>
       <div class="delivery-option">
         <input type="radio"
           class="delivery-option-input"
           name="delivery-option-${matchitem.id}">
         <div>
           <div class="delivery-option-date">
             Monday, June 13
           </div>
           <div class="delivery-option-price">
             $9.99 - Shipping
           </div>
         </div>
       </div>
     </div>
   </div>
 </div>`;

});
//console.log(cartSummary);
document.querySelector('.js-order-summary').innerHTML = cartSummary;

document.querySelectorAll('.js-delete-link').forEach((link) =>{
    link.addEventListener('click', () =>{
        const productId = link.dataset.productId
       removeFromCart(productId);
     const cointainer =   document.querySelector(`.js-cart-item-cointainer-${productId}`);
     cointainer.remove();
    });
});