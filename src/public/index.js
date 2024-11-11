const socketClient = io();
console.log("Clients connected");

const product = document.getElementById("real-time-products");
const sendBtn = document.getElementById("send");

socketClient.on("getAllProducts", (data) => {
  const productsRender = data
    .map((product) => {
      return `
        <div>
          <p><strong>${product.title}</strong>: ${product.price}</p> 
          <button onclick="deleteProduct('${product.id}')">Eliminar</button>
        </div>`;
    })
    .join("\n");
  product.innerHTML = productsRender;
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
    category: category.value        
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
