const socketClient = io();
console.log("Clients connected");

const cart = document.getElementById("real-time-cart");
const product = document.getElementById("real-time-products");
socketClient.on("getAll", (cartData, prodData) => {
  if (cartData.docs.length === 0) {
    cart.innerHTML = "No hay carritos disponibles.";
    return;
  }

  if (prodData.docs.length === 0) {
    product.innerHTML = "No hay productos disponibles.";
    return;
  }

  const cartOptions = cartData.docs
    .map(
      (cart) => `<option value="${cart._id}">Carrito ID: ${cart._id}</option>`
    )
    .join("\n");

  const cartRender = `
  <label for="cart-select">Seleccionar carrito:</label>
  <select id="cart-select">
    <option value="" selected disabled>Selecciona un carrito</option>
    ${cartOptions}
  </select>
  <div>
    ${cartData.docs
      .map((cart) => {
        const productsList = cart.products
          .map((product) => {
            return `
                <li>
                  <strong>${product.title}</strong><br>
                  Precio: $${product.price}<br>
                  Stock: ${product.stock}<br>
                  Categoría: ${product.category}
                  <button onclick="deleteProduct('${product._id}')">Eliminar del carrito</button>
                </li>
              `;
          })
          .join("\n");

        return `
            <div class="cart">
              <p><strong>Carrito ID: ${cart._id}</strong></p>
              <ul>${productsList}</ul>
              <button onclick="deleteCart('${cart._id}')">Eliminar carrito</button>
            </div>`;
      })
      .join("\n")}
  </div>
`;

  cart.innerHTML = cartRender;

  const productsRender = prodData.docs
    .map((product) => {
      return `
      <div class='product'>
        <p><strong>${product.title}</strong></p>
        <p>Stock: ${product.stock}</p>
        <p>Precio: $${product.price}</p>
        <button onclick="handleAddToCart('${product._id}')">Añadir</button>
      </div>`;
    })
    .join("\n");

  product.innerHTML = productsRender;

  const navigation = `
    <div class="pagination">
      ${
        prodData.hasPrevPage
          ? `<button id="prevBtn" data-page="${prodData.prevPage}">Anterior</button>`
          : ""
      }
      ${
        prodData.hasNextPage
          ? `<button id="nextBtn" data-page="${prodData.nextPage}">Siguiente</button>`
          : ""
      }
    </div>
  `;

  product.innerHTML += navigation;

  if (prodData.hasPrevPage) {
    document.getElementById("prevBtn").addEventListener("click", (e) => {
      const page = e.target.getAttribute("data-page");
      socketClient.emit("getProductsByPage", { page });
    });
  }

  if (prodData.hasNextPage) {
    document.getElementById("nextBtn").addEventListener("click", (e) => {
      const page = e.target.getAttribute("data-page");
      socketClient.emit("getProductsByPage", { page });
    });
  }

  cart.innerHTML = cartRender;
});

function deleteCart(id) {
  console.log(id);
  socketClient.emit("deleteCart", id);
}

function handleAddToCart(productId) {
  const cartSelect = document.getElementById("cart-select");
  const cartId = cartSelect.value;

  if (!cartId) {
    alert("Por favor, selecciona un carrito antes de añadir o eliminar productos.");
    return;
  }
  addToCart(cartId, productId);
  removeFromCart(cartId, productId);
}

function addToCart(cartId, productId) {
  console.log(`Añadiendo producto ${productId} al carrito ${cartId}`);
  socketClient.emit("addToCart", { cartId, productId });
}

function removeFromCart(cartId, productId) {
  console.log(`Eliminando producto ${productId} del carrito ${cartId}`);
  socketClient.emit("removeFromCart", { cartId, productId });
}

function deleteProduct(id) {
  console.log(id);
  socketClient.emit("deleteProduct", id);
}
