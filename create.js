//Endpoint: https://striveschool-api.herokuapp.com/api/product/
// const createUrl = "https://striveschool-api.herokuapp.com/api/product/"
// Elementi del DOM:
// const productsBox = document.getElementById("products");
const inputName = document.getElementById("name");
const inputDescription = document.getElementById("description");
const inputBrand = document.getElementById("brand");
const inputPrice = document.getElementById("price");
const inputImg = document.getElementById("img");
const alertMsg = document.getElementById("alertMsg");


async function addProduct() {
    if (inputName.value && inputDescription.value && inputBrand.value && inputPrice.value && inputImg.value) {
    try {
        const newProduct = {
            name: inputName.value,
            description: inputDescription.value,
            brand: inputBrand.value,
            price: inputPrice.value,
            imageUrl: inputImg.value
        }

        const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify(newProduct),
            headers: {
                "Content-Type": "application/json",
                authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JlMTgwMTFlMTQwNjAwMTUzMTRkYTIiLCJpYXQiOjE3NDA1MTEyMzMsImV4cCI6MTc0MTcyMDgzM30.0ljVl1vU5VL7lfuLNrKDOxdXNZZZWxV8tQQAlKvW2xc"
            }
        })
        getProducts();
        resetForm();
    }
    catch (error) {
        console.log(error)
    }
}
else {
    alertMsg.classList.remove('d-none');

        setTimeout(() => {
            alertMsg.classList.add('d-none');
        }, 5000);
    console.log("Please fill in all the fields")
}
}