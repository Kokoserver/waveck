<script>
  // You might want to calculate these values based on the cart items
  let originalPrice = 7592.0;
  let savings = 299.0;
  let storePickup = 99;
  let tax = 799;
  let total = originalPrice - savings + storePickup + tax;

  
</script>

<div class="card bg-base-100 shadow-xl">
  <div class="card-body">
    <h3 class="card-title">Order summary</h3>
    <div class="space-y-4">
      <div class="flex justify-between">
        <span>Original price</span>
        <span>${originalPrice.toFixed(2)}</span>
      </div>
      <div class="flex justify-between">
        <span>Savings</span>
        <span class="text-success">-${savings.toFixed(2)}</span>
      </div>
      <div class="flex justify-between">
        <span>Store Pickup</span>
        <span>${storePickup}</span>
      </div>
      <div class="flex justify-between">
        <span>Tax</span>
        <span>${tax}</span>
      </div>
      <div class="flex justify-between font-bold">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
    <button class="btn btn-primary w-full">Proceed to Checkout</button>
    <div class="text-center">
      <span>or</span>
      <a href="/" class="link link-primary">Continue Shopping</a>
    </div>
  </div>
</div>
