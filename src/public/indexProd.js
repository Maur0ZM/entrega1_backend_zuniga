const socketClient = io();
console.log("Clients connected");

const product = document.getElementById("real-time-products");
const sendBtn = document.getElementById("send");

socketClient.on("getAllProducts", (data) => {
  if (data.docs.length === 0) {
    product.innerHTML = "No hay productos disponibles.";
    return;
  }
  const productsRender = data.docs
    .map((product) => {
      return `
        <div class='product'>
          <p><strong>${product.title}</strong></p>
          <p>Stock: ${product.stock}</p>
          <p>Precio: $${product.price}</p>
          <button onclick="deleteProduct('${product._id}')">Eliminar</button>
        </div>`;
    })
    .join("\n");

  product.innerHTML = productsRender;

  const navigation = `
    <div class="pagination">
      ${
        data.hasPrevPage
          ? `<button id="prevBtn" data-page="${data.prevPage}">Anterior</button>`
          : ""
      }
      ${
        data.hasNextPage
          ? `<button id="nextBtn" data-page="${data.nextPage}">Siguiente</button>`
          : ""
      }
    </div>
  `;

  product.innerHTML += navigation;

  if (data.hasPrevPage) {
    document.getElementById("prevBtn").addEventListener("click", (e) => {
      const page = e.target.getAttribute("data-page");
      socketClient.emit("getProductsByPage", { page });
    });
  }

  if (data.hasNextPage) {
    document.getElementById("nextBtn").addEventListener("click", (e) => {
      const page = e.target.getAttribute("data-page");
      socketClient.emit("getProductsByPage", { page });
    });
  }
});

sendBtn.addEventListener("click", async () => {
  const title = document.getElementById("title");
  const description = document.getElementById("description");
  const code = document.getElementById("code");
  const price = document.getElementById("price");
  const status = document.getElementById("status");
  const stock = document.getElementById("stock");
  const category = document.getElementById("category");

  const newProduct = {
    title: title.value,
    description: description.value,
    code: parseInt(code.value),
    price: parseFloat(price.value),
    status: status.checked,
    stock: parseInt(stock.value),
    category: category.value,
  };

  socketClient.emit("createProduct", newProduct);
});

function deleteProduct(id) {
  console.log(id);
  socketClient.emit("deleteProduct", id);
}

socketClient.on("validatorError", (mssg) => {
  alert(mssg.error);
});
