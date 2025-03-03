const url = "https://striveschool-api.herokuapp.com/api/product/"

// Elementi del DOM:
const productBox = document.getElementById("productBox");

async function getProduct() {
    const query = window.location.search;
    const params = new URLSearchParams(query);
    const productId = params.get("id");
    try {
        const response = await fetch(url + productId, {
            method: "GET",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JlMTgwMTFlMTQwNjAwMTUzMTRkYTIiLCJpYXQiOjE3NDA1MTEyMzMsImV4cCI6MTc0MTcyMDgzM30.0ljVl1vU5VL7lfuLNrKDOxdXNZZZWxV8tQQAlKvW2xc",
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        console.log(data);
        const myProductCard = createProductTemplate(data);
        productBox.appendChild(myProductCard);
    } catch (error) {
        console.log(error);
    }
}

function createProductTemplate({ name, description, brand, price, imageUrl }) {
    const card = document.createElement("div");
    card.classList.add("card", "text-start", "h-100");

    const img = document.createElement("img");
    img.src = imageUrl;
    img.classList.add("card-img-top", "w-50", "h-25", "m-auto");
    img.alt = `${name}_${brand}`;

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "d-flex", "flex-column", "justify-content-between");

    const title = document.createElement("h2");
    title.classList.add("card-title");
    title.innerText = name;

    const desc = document.createElement("h6");
    desc.innerText = description;

    const brandName = document.createElement("h6");
    brandName.innerText = brand;

    const priceTag = document.createElement("h6");
    priceTag.innerText = price;

    cardBody.appendChild(title);
    cardBody.appendChild(desc);
    cardBody.appendChild(brandName);
    cardBody.appendChild(priceTag);

    card.appendChild(img);
    card.appendChild(cardBody);

    return card;
}

getProduct();