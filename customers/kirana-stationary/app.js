let products = {
  grocery: [
    {id:"g1", name:"Rice 1kg", price:60},
    {id:"g2", name:"Sugar 1kg", price:50},
    {id:"g3", name:"Oil 1L", price:120}
  ],
  stationery: [
    {id:"s1", name:"Notebook", price:40},
    {id:"s2", name:"Pen", price:10},
    {id:"s3", name:"Pencil", price:5}
  ]
};

let cart = {};

function loadProducts() {

  let category = document.getElementById("categorySelect").value;
  let container = document.getElementById("productList");
  container.innerHTML = "";

  if(!category) return;

  products[category].forEach((item) => {

    container.innerHTML += `
      <div class="product">
        <strong>${item.name}</strong><br>
        ₹${item.price}<br>
        <input type="number" min="0" value="0"
          onchange="addToCart('${category}', '${item.id}', this.value)">
      </div>
    `;
  });
}

function addToCart(category, id, qty) {

  qty = parseInt(qty) || 0;

  let product = products[category].find(p => p.id === id);

  if(qty > 0){
    cart[id] = {
      name: product.name,
      price: product.price,
      qty: qty
    };
  } else {
    delete cart[id];
  }

  calculateTotal();
}

function calculateTotal() {

  let total = 0;

  Object.values(cart).forEach(item => {
    total += item.qty * item.price;
  });

  document.getElementById("totalAmount").innerText = total;
}

function sendOrder() {

  let message = "🛒 Order Details:\n\n";
  let total = 0;

  Object.values(cart).forEach(item => {
    total += item.qty * item.price;
    message += `${item.name} - ${item.qty} = ₹${item.qty * item.price}\n`;
  });

  if(total === 0){
    alert("Please add items to cart");
    return;
  }

  message += `\nTotal: ₹${total}`;

  window.open("https://wa.me/919748016880?text=" + encodeURIComponent(message));
}
