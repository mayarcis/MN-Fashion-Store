
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart() {

    let cartItems = document.getElementById("cartItems");
    let totalPrice = document.getElementById("totalPrice");
    let total = 0;

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="text-center py-5">
                <i class="bi bi-cart3 fs-1"></i>
                <h5 class="mt-3">Your cart is empty!</h5>
            </div>
        `;
    }

    cart.forEach(function(product, index) {

        let quantity = product.quantity || 1;
        total += Number(product.price) * quantity;

        cartItems.innerHTML += `
            <div class="card mb-3 p-3">
                <div class="row align-items-center">

                    <div class="col-md-2">
                        <img src="${product.image}" class="img-fluid" alt="${product.name}">
                    </div>

                    <div class="col-md-7">
                        <h5>${product.name}</h5>
                        <p class="mb-1">Price: $${product.price}</p>
                        <p class="mb-0">Quantity: ${quantity}</p>
                        <p class="mb-0">Size: ${product.size || "Not selected"}</p>
                        <p class="mb-0">Color: ${product.color || "Not selected"}</p>
                    </div>

                    <div class="col-md-3 text-end">
                        <button class="btn btn-danger delete-btn" data-index="${index}">
                            <i class="bi bi-trash"></i> Delete
                        </button>
                    </div>

                </div>
            </div>
        `;
    });

    totalPrice.textContent = total.toFixed(2);

    localStorage.setItem("cart", JSON.stringify(cart));

    document.querySelectorAll(".delete-btn").forEach(function(button) {

        button.addEventListener("click", function() {

            let index = Number(this.dataset.index);

            cart.splice(index, 1);

            localStorage.setItem("cart", JSON.stringify(cart));

            displayCart();

        });

    });

}

document.getElementById("checkoutBtn").addEventListener("click", function() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert("Thank you for shopping!");

        cart = [];

        localStorage.setItem("cart", JSON.stringify(cart));

        displayCart();
    }

});

displayCart();
