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
        <button class="qty-btn" onclick="changeQty('${item.id}', '${category}', -1)">-</button>
        <button class="qty-btn" onclick
