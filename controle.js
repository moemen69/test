let cart = [];

// Display products
window.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="price">${product.price}</div>
      </div>
    `;
    card.addEventListener("click", () => openModal(product));
    productList.appendChild(card);
  });
});

// MODAL CONTROL
const modal = document.getElementById("productModal");
const closeModal = document.getElementById("closeModal");
const modalImg = document.getElementById("modalImage");
const modalName = document.getElementById("modalName");
const modalDesc = document.getElementById("modalDesc");
const modalPrice = document.getElementById("modalPrice");
const addToCartBtn = document.getElementById("addToCartBtn");
const sizeSelect = document.getElementById("sizeSelect");

let currentProduct = null;

function openModal(product) {
  currentProduct = product;
  modalImg.src = product.image;
  modalName.textContent = product.name;
  modalDesc.textContent = product.description;
  modalPrice.textContent = product.price;
  modal.style.display = "flex";
}

closeModal.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", e => {
  if (e.target === modal) modal.style.display = "none";
});

// CART CONTROL
const cartSidebar = document.getElementById("cartSidebar");
const cartIcon = document.getElementById("cartIcon");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cartTotal");

cartIcon.addEventListener("click", () => cartSidebar.classList.add("active"));
closeCart.addEventListener("click", () => cartSidebar.classList.remove("active"));

addToCartBtn.addEventListener("click", () => {
  if (!currentProduct) return;
  const selectedSize = sizeSelect.value;
  const newItem = { ...currentProduct, size: selectedSize, cartId: Date.now() };
  cart.push(newItem);
  updateCart();
  modal.style.display = "none";
  cartSidebar.classList.add("active");
});

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    const el = document.createElement("div");
    el.classList.add("cart-item");
    el.innerHTML = `
      <img src="${item.image}" alt="">
      <div>
        <p>${item.name} <small>(${item.size})</small></p>
        <span>${item.price}</span>
      </div>
      <button class="remove-btn" data-id="${item.cartId}">✖</button>
    `;
    cartItems.appendChild(el);
    total += parseFloat(item.price.replace("$",""));
  });

  // Add remove event
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = parseInt(e.target.dataset.id);
      cart = cart.filter(item => item.cartId !== id);
      updateCart();
    });
  });

  cartCount.textContent = cart.length;
  cartTotal.textContent = "$" + total.toFixed(2);
}

// CHECKOUT FORM
const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutModal = document.getElementById("checkoutModal");
const closeCheckout = document.getElementById("closeCheckout");
const checkoutForm = document.getElementById("checkoutForm");

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  checkoutModal.style.display = "flex";
});

closeCheckout.addEventListener("click", () => checkoutModal.style.display = "none");
checkoutForm.addEventListener("submit", e => {
  e.preventDefault();
  alert("Thank you for your purchase!");
  checkoutModal.style.display = "none";
  cart = [];
  updateCart();
});
