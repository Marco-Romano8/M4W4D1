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
      <div class="card text-center h-100">
        <img src="${prod.imageUrl}" class="card-img-top w-75 h-50 m-auto" alt="${prod._id}_${prod.name}">
        <div class="card-body d-flex flex-column justify-content-between">
          <p></p>
          <h5 class="card-title">${prod.name}</h5>
          <a href="./detail.html?id=${prod._id}" class="btn d-block button">Details</a>
        </div>
      </div> 
    </div>`
    })
}
