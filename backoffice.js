//Endpoint: https://striveschool-api.herokuapp.com/api/product/
const url = "https://striveschool-api.herokuapp.com/api/product/"

// Elementi del DOM:
const productsBox = document.getElementById("products");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
// const formName = document.getElementById("name");
// const formDescription = document.getElementById("description");
// const formBrand = document.getElementById("brand");
// const formPrice = document.getElementById("price");
// const formImg = document.getElementById("img");
const formElement = document.getElementById('productForm');


let products = [];

async function getProducts() {
    try {  
        const res = await fetch(url, {
            headers: {
                authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JlMTgwMTFlMTQwNjAwMTUzMTRkYTIiLCJpYXQiOjE3NDA1MTEyMzMsImV4cCI6MTc0MTcyMDgzM30.0ljVl1vU5VL7lfuLNrKDOxdXNZZZWxV8tQQAlKvW2xc",
            },
        });
        const json = await res.json();
        console.log(json);
        renderProducts(json);

        products = json;
    } catch (error) {
        console.log(error)
    }
}

function renderProducts(products) {
    productsBox.innerHTML = "";
    const productsNodes = products.map(product => createRow(product));

    productsBox.append(...productsNodes);
}

function createRow({name, description, brand, price, imageUrl, _id }) {
    const tableRow = document.createElement("tr");


    const cellName = myTd(name);
    cellName.classList.add('col-2', 'fw-semibold', 'text-uppercase');
    const cellDescription = myTd(description); 
    cellDescription.classList.add('col-2', 'cell');
    const cellImg = myTd(imageUrl); 
    cellImg.classList.add('col-2', 'cell', 'cellTablet');
    const cellBrand = myTd(brand);
    cellBrand.classList.add('col-2', 'text-uppercase', 'cell');
    const cellPrice = myTd(price);
    cellPrice.classList.add('col-1');
    const cellActions = myTd('');
    cellActions.classList.add('col-1');

    const editButton = document.createElement("a");
    editButton.className='btn btn-outline-primary btn-sm w-100 mb-2';
    editButton.setAttribute("href", `detailEdit.html?q=${_id}`);
    editButton.innerText = "Edit";

    const deleteButton = document.createElement('button');
    deleteButton.className='btn btn-danger btn-sm w-100';
    deleteButton.innerText="Elimina";
    deleteButton.addEventListener('click', () => {
        deleteProduct(_id);
    })

    cellActions.appendChild(editButton);
    cellActions.appendChild(deleteButton);

    tableRow.append(cellName, cellDescription, cellBrand, cellImg, cellPrice, cellActions);
    return tableRow;
}

function myTd(text) {
    const myCell = document.createElement("td");
    myCell.innerText = text;

    return myCell;
}

// async function addProduct() {
//     if (!inputName.value || !inputDescription.value || !inputBrand.value || !inputPrice.value) {
//         alert("Please fill in all the fields")
//     try {
//         const newProduct = {
//             name: inputName.value,
//             description: inputDescription.value,
//             brand: inputBrand.value,
//             price: inputPrice.value
//         }

//         const res = await fetch(url, {
//             method: "POST",
//             body: JSON.stringify(newProduct),
//             headers: {
//                 "Content-Type": "application/json",
//                 authorization:
//                     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JlMTgwMTFlMTQwNjAwMTUzMTRkYTIiLCJpYXQiOjE3NDA1MTEyMzMsImV4cCI6MTc0MTcyMDgzM30.0ljVl1vU5VL7lfuLNrKDOxdXNZZZWxV8tQQAlKvW2xc"
//             }
//         })
//         getProducts();
//         resetForm();
//     }
//     catch (error) {
//         console.log(error)
//     }
// }
// }

// function editProduct(name, description, brand, price, imageUrl) {
//     formName.value = name;
//     formDescription.value = description;
//     formBrand.value = brand;
//     formPrice.value = price;
//     formImg.value = imageUrl;
// }

function deleteProduct(id) {
    console.log(id);
    fetch(`${url}/${id}`, {
        method: 'DELETE',
        headers: {
            authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JlMTgwMTFlMTQwNjAwMTUzMTRkYTIiLCJpYXQiOjE3NDA1MTEyMzMsImV4cCI6MTc0MTcyMDgzM30.0ljVl1vU5VL7lfuLNrKDOxdXNZZZWxV8tQQAlKvW2xc",
        },
    })
    .then((response) => response.json())
    .then(() => {
        getProducts();
    });
}

function liveSearch() {
    const searchValue = searchInput.value.toLowerCase();
    const filteredProducts = products.filter(product => {
        if (
        product.price === Number (searchValue) || 
        product.name.toLowerCase().includes(searchValue.toLowerCase()) || 
        product.description.toLowerCase().includes(searchValue.toLowerCase()) || 
        product.brand.toLowerCase().includes(searchValue.toLowerCase())
        ) {  
        return true;
    } return false;
    });
    renderProducts(filteredProducts);
}

function resetForm() {
    formElement.reset();
}

// searchButton.addEventListener("click", liveSearch);

getProducts();