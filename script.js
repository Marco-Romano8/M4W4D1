const url = "https://striveschool-api.herokuapp.com/api/product/"

window.onload = async () => {
    const res = await fetch(url, {
        headers: {
            authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JlMTgwMTFlMTQwNjAwMTUzMTRkYTIiLCJpYXQiOjE3NDA1MTEyMzMsImV4cCI6MTc0MTcyMDgzM30.0ljVl1vU5VL7lfuLNrKDOxdXNZZZWxV8tQQAlKvW2xc",
        },
    });
    const products = await res.json()
    const row = document.querySelector("#products")
    products.forEach((prod) => {
        row.innerHTML += `
    <div class='col-6 col-md-4 col-lg-3 mb-4'>  
      <div class="card text-center h-100 position-relative">
            <button class="btn button position-absolute top-0 end-0 m-2 rounded-circle addProduct" onclick="addToCart('${prod._id}', '${prod.name}', ${prod.price})">+</button>
        <img src="${prod.imageUrl}" class="card-img-top w-75 h-50 m-auto" alt="${prod._id}_${prod.name}">
        <div class="card-body d-flex flex-column justify-content-between">
          <p></p>
          <h5 class="card-title">${prod.name}</h5>
          <p class="card-text">${prod.price}€</p>
          <a href="./detail.html?id=${prod._id}" class="btn d-block button">Details</a>
        </div>
      </div> 
    </div>`
    })
}

// Funzione per aggiungere un prodotto al carrello
function addToCart(id, name, price) {
  const cart = document.querySelector("#cart");
  const totalPrice = document.querySelector("#total-price");
  let currentTotal = parseFloat(totalPrice.textContent.replace("€", ""));
  
  const item = document.createElement("li");
  item.className = "list-group-item d-flex justify-content-between align-items-center";
  item.setAttribute("data-id", id);
  item.innerHTML = `
      <span>${name} - €${price.toFixed(2)}</span>
      <button class="btn btn-danger btn-sm" onclick="removeFromCart('${id}', ${price})">X</button>
  `;
  cart.appendChild(item);
  
  totalPrice.textContent = `€${(currentTotal + price).toFixed(2)}`;
}

// Funzione per rimuovere un prodotto dal carrello
function removeFromCart(id, price) {
  const cart = document.querySelector("#cart");
  const totalPrice = document.querySelector("#total-price");
  let currentTotal = parseFloat(totalPrice.textContent.replace("€", ""));
  
  const itemToRemove = cart.querySelector(`[data-id='${id}']`);
  if (itemToRemove) {
      cart.removeChild(itemToRemove);
      totalPrice.textContent = `€${(currentTotal - price).toFixed(2)}`;
  }
}

// Funzione per svuotare il carrello
function emptyCart() {
  const cart = document.querySelector("#cart");
  const totalPrice = document.querySelector("#total-price");
  cart.innerHTML = "";
  totalPrice.textContent = "€0.00";
}