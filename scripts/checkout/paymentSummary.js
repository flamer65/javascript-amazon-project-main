import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../util/money.js";
export function renderPaymentSummary(){
  let productPriceCents = 0;
  let shippingCents = 0 ;
  cart.forEach( (cartitem) => {
    const product = getProduct(cartitem.productId);
    productPriceCents += product.priceCents * cartitem.quantity;
    const deliveryOption = getDeliveryOption(cartitem.deliveryOptionId);
    shippingCents += deliveryOption.pricecents
  });
  const totalBeforeTaxCents = productPriceCents  + shippingCents;
  const taxcents  = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxcents;

  const paymentSummaryHtml = `
    <div class="payment-summary-title">
     Order Summary
    </div>

    <div class="payment-summary-row">
    <div class="js-items-in-cart"></div>
    <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">$${formatCurrency(shippingCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
    </div>

    <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">$${formatCurrency(taxcents)}</div>
    </div>

    <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary">
    Place your order
    </button>
  `

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml;
}