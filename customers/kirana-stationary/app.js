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

  products[category].forEach(item => {

    container.innerHTML += `
      <div class="product">
        <strong>${item.name}</strong><br>
        ₹${item.price}<br>

        <input type="number" min="0" value="0"
        style="width:60px; padding:5px; margin-top:5px;"
        oninput="setQty('${item.id}', '${category}', this.value)">
      </div>
    `;
  });
}

function setQty(id, category, value){

  let qty = parseInt(value);

  if(!qty || qty <= 0){
    delete cart[id];
  } else {
    let item = products[category].find(p => p.id === id);
    cart[id] = {...item, qty: qty};
  }

  updateCart();
}

function updateCart() {

  let cartContainer = document.getElementById("cartItems");
  cartContainer.innerHTML = "";

  let total = 0;

  Object.values(cart).forEach(item => {

    total += item.price * item.qty;

    cartContainer.innerHTML += `
      <div>
        ${item.name} x ${item.qty} = ₹${item.price * item.qty}
      </div>
    `;
  });

  document.getElementById("totalAmount").innerText = total;
}

function sendOrder() {

  if(Object.keys(cart).length === 0){
    alert("Please select items first");
    return;
  }

  let message = "Assalamualaikum\nMera order:\n\n";

  Object.values(cart).forEach(item => {
    message += `${item.name} x ${item.qty} = ₹${item.price * item.qty}\n`;
  });

  message += `\nTotal: ₹${document.getElementById("totalAmount").innerText}`;

  let whatsappURL = "https://wa.me/919748016880?text=" + encodeURIComponent(message);

  window.open(whatsappURL, "_blank");
}
