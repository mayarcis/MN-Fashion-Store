
let currentLang = localStorage.getItem("language") || "en";
let currentTheme = localStorage.getItem("theme") || "light";

function changeLanguage() {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";

    document.querySelectorAll("[data-en][data-ar]").forEach(function(element) {
        element.textContent = currentLang === "ar" ? element.dataset.ar : element.dataset.en;
    });

    document.querySelectorAll("[data-placeholder-en]").forEach(function(element) {
        element.placeholder = currentLang === "ar" ? element.dataset.placeholderAr : element.dataset.placeholderEn;
    });

    let langBtn = document.getElementById("langBtn");

    if (langBtn) {
        langBtn.textContent = currentLang === "en" ? "العربية" : "English";
    }

    localStorage.setItem("language", currentLang);
}

function changeTheme() {
    document.body.classList.toggle("dark-mode", currentTheme === "dark");

    let themeBtn = document.getElementById("themeBtn");

    if (themeBtn) {
        themeBtn.innerHTML = currentTheme === "dark"
            ? '<i class="bi bi-sun"></i>'
            : '<i class="bi bi-moon"></i>';
    }

    localStorage.setItem("theme", currentTheme);
}

let langBtn = document.getElementById("langBtn");
let themeBtn = document.getElementById("themeBtn");

if (langBtn) {
    langBtn.addEventListener("click", function() {
        currentLang = currentLang === "en" ? "ar" : "en";
        changeLanguage();
    });
}

if (themeBtn) {
    themeBtn.addEventListener("click", function() {
        currentTheme = currentTheme === "light" ? "dark" : "light";
        changeTheme();
    });
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let count = cart.reduce(function(total, product) {
        return total + (product.quantity || 1);
    }, 0);

    let cartCount = document.getElementById("cartCount");

    if (cartCount) {
        cartCount.textContent = count;
    }
}

document.querySelectorAll(".product-details").forEach(function(details) {
    let sizes = details.querySelectorAll(".size-option");
    let colors = details.querySelectorAll(".color-circle");

    let selectedSize = details.querySelector(".selected-size span");
    let selectedColor = details.querySelector(".selected-color span");

    sizes.forEach(function(size) {
        size.addEventListener("click", function() {
            sizes.forEach(function(item) {
                item.classList.remove("active");
            });

            this.classList.add("active");

            if (selectedSize) {
                selectedSize.textContent = this.textContent.trim();
            }
        });
    });

    colors.forEach(function(color) {
        color.addEventListener("click", function() {
            colors.forEach(function(item) {
                item.classList.remove("selected");
            });

            this.classList.add("selected");

            if (selectedColor) {
                selectedColor.textContent = this.dataset.color;
            }
        });
    });
});

document.querySelectorAll(".add-to-cart").forEach(function(button) {
    button.addEventListener("click", function() {
        let details = this.closest(".product-details");

        let sizeElement = details ? details.querySelector(".selected-size span") : null;
        let colorElement = details ? details.querySelector(".selected-color span") : null;

        let size = sizeElement ? sizeElement.textContent.trim() : "Not selected";
        let color = colorElement ? colorElement.textContent.trim() : "Not selected";

        if (size === "None" || color === "None" || size === "" || color === "") {
            alert("Please select a size and color first.");
            return;
        }

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        let name = this.dataset.name;
        let price = Number(this.dataset.price);
        let image = this.dataset.image;

        let id = (this.dataset.id || name) + "-" + size + "-" + color;

        let product = cart.find(function(item) {
            return item.id === id;
        });

        if (product) {
            product.quantity++;
        } else {
            cart.push({
                id: id,
                name: name,
                price: price,
                image: image,
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

changeLanguage();
changeTheme();
updateCartCount();
