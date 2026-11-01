document.querySelectorAll(".product-details").forEach(function (product) {

    let colors = product.querySelectorAll(".color-circle");
    let sizes = product.querySelectorAll(".size-option");

    let selectedColor = product.querySelector(".selected-color span");
    let selectedSize = product.querySelector(".selected-size span");

    colors.forEach(function (color) {

        color.addEventListener("click", function () {

            colors.forEach(function (item) {
                item.classList.remove("selected");
            });

            color.classList.add("selected");

            if (selectedColor) {
                selectedColor.textContent = color.dataset.color;
            }

        });

    });

    sizes.forEach(function (size) {

        size.addEventListener("click", function () {

            sizes.forEach(function (item) {
                item.classList.remove("selected");
            });

            size.classList.add("selected");

            if (selectedSize) {
                selectedSize.textContent = size.textContent.trim();
            }

        });

    });

});


function updateCartCount() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let count = cart.reduce(function (total, product) {
        return total + (product.quantity || 1);
    }, 0);

    let cartCount = document.getElementById("cartCount");

    if (cartCount) {
        cartCount.textContent = count;
    }

}


document.querySelectorAll(".add-to-cart").forEach(function (button) {

    button.addEventListener("click", function () {

        let details = this.closest(".product-details");

        let selectedSize = details.querySelector(".size-option.selected");
        let selectedColor = details.querySelector(".color-circle.selected");

        let size = selectedSize ? selectedSize.textContent.trim() : "Not selected";
        let color = selectedColor ? selectedColor.dataset.color : "Not selected";

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        let id = this.dataset.id + "-" + size + "-" + color;

        let product = cart.find(function (item) {
            return item.id === id;
        });

        if (product) {

            product.quantity++;

        } else {

            cart.push({
                id: id,
                name: this.dataset.name,
                price: Number(this.dataset.price),
                image: this.dataset.image,
                size: size,
                color: color,
                quantity: 1
            });

        }

        localStorage.setItem("cart", JSON.stringify(cart));

        updateCartCount();

        alert("Product added to cart!");

    });

});


updateCartCount();


function changeTheme() {

    document.body.classList.toggle(
        "dark-mode",
        currentTheme === "dark"
    );

    if (themeBtn) {
        themeBtn.innerHTML =
            currentTheme === "dark"
                ? '<i class="bi bi-sun"></i>'
                : '<i class="bi bi-moon"></i>';
    }

    localStorage.setItem("theme", currentTheme);

}


if (themeBtn) {

    themeBtn.addEventListener("click", function () {

        currentTheme =
            currentTheme === "light" ? "dark" : "light";

        changeTheme();

    });

}