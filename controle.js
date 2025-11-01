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

    productList.appendChild(card);
  });
});
