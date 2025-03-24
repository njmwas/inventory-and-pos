const API_BASE_URL = "https://mock-json-server-api-ox6c.onrender.com/api";

const enventoryListTable = document.querySelector("#enventory-list tbody");
const posPorductsDiv = document.querySelector('#pos-products');

function invetoryEnlist(product) {

    const row = document.createElement('tr');
    const col1 = document.createElement('td');
    col1.appendChild(document.createTextNode(product.name));

    const col2 = document.createElement('td');
    col2.appendChild(document.createTextNode(product.instock));

    const col3 = document.createElement('td');
    col3.appendChild(document.createTextNode(product.price));

    row.append(col1, col2, col3);
    enventoryListTable.appendChild(row);

    // enventoryListTable.innerHTML += `
    //     <tr>
    //         <td>${product.name}</td>
    //         <td>${product.instock}</td>
    //         <td>${product.price}</td>
    //     </tr>
    // `
}

function posEnlist(product) {
    posPorductsDiv.innerHTML += `
        <div class="card" style="width: 20%;">
            <img src="images/placeholder.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h3>${product.name}</h3>
                <p class="card-text">${product.description}</p>
                <div class="d-flex justify-content-between">
                <button type="button" class="btn"> <i class="bi bi-cart-plus"></i> Add to cart</button>
                    <strong>${product.price}</strong>
                <div>
            </div>
        </div>`;
}

function enlistAllProducts() {
    fetch(`${API_BASE_URL}/products`)
        .then(response => response.json())
        .then(products => {
            // console.log(products)
            products.forEach(product => invetoryEnlist(product))
        })

}
enlistAllProducts();

document.querySelector("#invetory-form").addEventListener("submit", (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const productData = {
        name: form.name.value,
        instock: form.instock.value,
        description: form.description.value,
        price: form.price.value
    }

    fetch(`${API_BASE_URL}/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(productData)
    })
        .then((response) => {
            return response.json()
        })
        .then(responseBody => {
            // console.log(responseBody);
            invetoryEnlist(responseBody)
            form.reset()
        })

    console.log(productData)
});

const shoppingCart = {
    totalCost: 0,
    items: [],
    addToCart: function (product) {
        this.items.push(product);

        this.totalCost = this.items.reduce((a, b) => a + parseFloat(b.price), 0)
        document.querySelector("#total-price").innerText = this.totalCost;

        const shoppingCartItemsDiv = document.querySelector("#shopping-cart-items");
        shoppingCartItemsDiv.innerHTML = ""
        this.items.forEach(item => {
            shoppingCartItemsDiv.innerHTML += `
                <li class="list-group-item d-flex justify-content-between" >
                    <span>${item.name}</span> <span>${item.price}</span>
                </li>
            `
        });

        document.querySelector("#item-count").innerText = this.items.length
    }
}

function endlistPOSProducts() {
    fetch(`${API_BASE_URL}/products`)
        .then(response => response.json())
        .then(products => {

            products.forEach(product => posEnlist(product));

            const allAddToCartBtn = posPorductsDiv.querySelectorAll(".card button");

            allAddToCartBtn.forEach((btn, i) => {
                btn.addEventListener("click", () => {
                    shoppingCart.addToCart(products[i])
                })
            });
            
        })
}
endlistPOSProducts()