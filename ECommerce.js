const products = [
  { id: 1, name: "Phone", price: 499, image: "phone.png" },
  { id: 2, name: "Laptop", price: 899, image: "laptop.png" },
  { id: 3, name: "Headphones", price: 199, image: "headphones.png" },
  { id: 4, name: "Smartwatch", price: 299, image: "smartwatch.png" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function loadProducts() {
  const list = document.getElementById("product-list");
  list.innerHTML = "";
  products.forEach(product => {
    list.innerHTML += `
      <div class="product">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
  });
}

function loadRecommendations() {
  const rec = document.getElementById("recommendations");
  const recommended = products.filter(p => p.id !== 1); // fake logic
  rec.innerHTML = "";
  recommended.forEach(product => {
    rec.innerHTML += `
      <div class="product">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
  });
}

function addToCart(id) {
  const item = products.find(p => p.id === id);
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${item.name} added to cart`);
}

function updateCartCount() {
  document.getElementById("cart-count").innerText = cart.length;
}

document.getElementById("cart").onclick = function () {
  const panel = document.getElementById("cart-panel");
  panel.style.display = panel.style.display === "block" ? "none" : "block";
  const items = document.getElementById("cart-items");
  items.innerHTML = "";
  cart.forEach(item => {
    items.innerHTML += `<li>${item.name} - $${item.price}</li>`;
  });
};

function checkout() {
  alert("Thank you for your purchase!");
  cart = [];
  localStorage.removeItem("cart");
  updateCartCount();
  document.getElementById("cart-panel").style.display = "none";
}

loadProducts();
loadRecommendations();
updateCartCount();
