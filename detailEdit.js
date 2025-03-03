const url = "https://striveschool-api.herokuapp.com/api/product/"

// Elementi del DOM:
const productName = document.getElementById("name");
const productDescription = document.getElementById("description");
const productBrand = document.getElementById("brand");
const productPrice = document.getElementById("price");
const productImg = document.getElementById("img");
const alertMsg = document.getElementById("alertMsg");
const editMsg = document.getElementById("editMsg");
const productEditBox = document.getElementById("productEdit");

const params = new URLSearchParams(window.location.search);
const productId = params.get("q");


async function getProduct() {
    try {

        const response = await fetch(url + productId, {
            method: "GET",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JlMTgwMTFlMTQwNjAwMTUzMTRkYTIiLCJpYXQiOjE3NDA1MTEyMzMsImV4cCI6MTc0MTcyMDgzM30.0ljVl1vU5VL7lfuLNrKDOxdXNZZZWxV8tQQAlKvW2xc",
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        productName.value = data.name;
        productDescription.value = data.description;
        productBrand.value = data.brand;
        productPrice.value = data.price;
        productImg.value = data.imageUrl;
    } catch (error) {
        console.error("Errore nel recupero del prodotto:", error);
    }
}


async function editProduct() {

    // Verifica che tutti i campi siano compilati
    if (productName.value && productDescription.value && productBrand.value && productPrice.value && productImg.value) {
        const productEdit = {
            name: productName.value,
            description: productDescription.value,
            brand: productBrand.value,
            price: productPrice.value,
            imageUrl: productImg.value
        };

        try {

            const response = await fetch(url + productId, {
                method: "PUT",
                body: JSON.stringify(productEdit),
                headers: {
                    "Content-Type": "application/json",
                    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JlMTgwMTFlMTQwNjAwMTUzMTRkYTIiLCJpYXQiOjE3NDA1MTEyMzMsImV4cCI6MTc0MTcyMDgzM30.0ljVl1vU5VL7lfuLNrKDOxdXNZZZWxV8tQQAlKvW2xc",
                }
            });

            editMsg.classList.remove('d-none');

            setTimeout(() => {
                editMsg.classList.add('d-none');
                window.location.href = "backoffice.html";
            }, 5000);

        } catch (error) {
            console.log(error);
        }
    } else {

        alertMsg.classList.remove('d-none');
        setTimeout(() => {
            alertMsg.classList.add('d-none');
        }, 5000);
        console.log("Please fill in all the fields");
    }
}

getProduct();

// LA MODIFICA FUNZIONA SOLO CHE MI DA UN PICCOLO ERRORE NON SO PERCHE' MA FUNZIONA