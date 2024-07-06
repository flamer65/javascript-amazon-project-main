import { cart , removeFromCart, calculateCartQuantity, updateQuantity as UpdateQuantity, updateDeliveryOption} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./util/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {deliveryOption} from "../data/deliveryOptions.js";

function renderOrderSummary() {
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
    let deliveryOptionId = cartitem.deliveryOptionId;
   
    let deliveryOptions;
    deliveryOption.forEach((option) =>{
      if(option.id === deliveryOptionId){
        deliveryOptions = option.deliveryDays
      }
    });
   let today = dayjs();
   let deliverydate = today.add(deliveryOptions,'days');
   let dateString = deliverydate.format('dddd, MMMM D');
  cartSummary += 
  `<div class="cart-item-container js-cart-item-cointainer-${matchitem.id}">
    <div class="delivery-date">
      Delivery date: ${dateString}
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
            Quantity: <span class="quantity-label js-quantity-label js-quantity-label-${matchitem.id}">${cartitem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-update-quantity " data-product-id="${matchitem.id}">
            Update
          </span>
          <input class="quantity-input js-quantity-input" >
          <span class="save-quantity-link link-primary" data-product-id="${matchitem.id}">Save</span>
          <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchitem.id}">
            Delete
          </span>             
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
          ${deliveryOptionHtml(matchitem, cartitem)}
      </div>
    </div>
  </div>`;

  });


  function deliveryOptionHtml(matchitem, cartitem){
  let html = ``;
    deliveryOption.forEach((deliveryOptions) =>{
      const today = dayjs();
      const deliverydates = today.add(deliveryOptions.deliveryDays, 'days');
      const dateString = deliverydates.format('dddd, MMMM D');
      const priceString = deliveryOptions.pricecents === 0 ? 'Free' : formatCurrency(deliveryOptions.pricecents)
      const isChecked = deliveryOptions.id === cartitem.deliveryOptionId;
      html += `<div class="delivery-option js-delivery-options" data-product-id= "${matchitem.id}" data-delivery-option-id="${deliveryOptions.id}">
      <input type="radio" ${isChecked ? 'checked' : ''}
        class="delivery-option-input"
        name="delivery-option-${matchitem.id}">
      <div>
        <div class="delivery-option-date">
        ${dateString}
        </div>
        <div class="delivery-option-price">
        ${priceString}
        </div>
      </div>
    </div>`
    });
    return html;
  }
  document.querySelector('.js-order-summary').innerHTML = cartSummary;

  document.querySelectorAll('.js-delete-link').forEach((link) =>{
      link.addEventListener('click', () =>{
          const productId = link.dataset.productId
        removeFromCart(productId);
      const cointainer =   document.querySelector(`.js-cart-item-cointainer-${productId}`);
      cointainer.remove();
      updateQuantity();
      
      });
  });

  function updateQuantity(){
      const cartQuantity = calculateCartQuantity();
      document.querySelector('.js-return-home-link').innerHTML = `${cartQuantity} Item`;
      document.querySelector('.js-items-in-cart').innerHTML = `Items(${cartQuantity}): `;
  }


  updateQuantity();
  document.querySelectorAll('.js-update-quantity').forEach((button)=>{
      button.addEventListener('click', () =>{
        const productId = button.dataset.productId;
        //console.log(productId);
        let container = document.querySelector(`.js-cart-item-cointainer-${productId}`);
        container.classList.add('is-editing-quantity');
        
      });
  });

  document.querySelectorAll('.save-quantity-link').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      let container = document.querySelector(`.js-cart-item-cointainer-${productId}`);
      container.classList.remove('is-editing-quantity');
      const updatequantity =  document.querySelector('.quantity-input');
      let newquantity = Number(updatequantity.value);
      if(newquantity < 0 || newquantity >= 1000){
        console.log(newquantity);
        alert("Quantity must be at least 0 and less than 1000");
        return;
      }
      UpdateQuantity(productId,newquantity);
      const quantityLabel = document.querySelector(
        `.js-quantity-label-${productId}`
      );
      quantityLabel.innerHTML = newquantity;
      
      updateQuantity();
    });
  });

  document.querySelectorAll('.js-delivery-options').forEach((element) =>{
    element.addEventListener('click', () =>{
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId)
      renderOrderSummary();
    });
  })

}

 renderOrderSummary();