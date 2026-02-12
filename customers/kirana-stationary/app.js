let products = {
  grocery: [
    {name:"Rice 1kg", price:60},
    {name:"Sugar 1kg", price:50},
    {name:"Oil 1L", price:120}
  ],
  stationery: [
    {name:"Notebook", price:40},
    {name:"Pen", price:10},
    {name:"Pencil", price:5}
  ]
};

let cart = [];

function loadProducts() {

  let category = document.getElementById("categorySelect").value;
  let container = document.getElementById("productList");
  container.innerHTML = "";

  if(!category) return;

  products[category].forEach((item, index) => {

    container.innerHTML += `
      <div class="product">
        <strong>${item.name}</strong><br>
        ₹${item.price}<br>
        <input type="number" min="0" value="0"
          onchange="addToCart('${category}', ${index}, this.value)">
      </div>
    `;
  });
}

function addToCart(category, index, qty) {

  qty = parseInt(qty) || 0;

  let product = products[category][index];

  cart[index] = {
    name: product.name,
    price: product.price,
    qty: qty
  };

  calculateTotal();
}

function calculateTotal() {

  let total = 0;

  cart.forEach(item => {
    if(item && item.qty > 0) {
      total += item.qty * item.price;
    }
  });

  document.getElementById("totalAmount").innerText = total;
}

function sendOrder() {

  let message = "🛒 Order Details:\n\n";
  let total = 0;

  cart.forEach(item => {
    if(item && item.qty > 0) {
      total += item.qty * item.price;
      message += `${item.name} - ${item.qty} = ₹${item.qty * item.price}\n`;
    }
  });

  if(total === 0){
    alert("Please add items to cart");
    return;
  }

  message += `\nTotal: ₹${total}`;

  window.open("https://wa.me/919748016880?text=" + encodeURIComponent(message));
}
