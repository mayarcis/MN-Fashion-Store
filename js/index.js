const langBtn = document.getElementById("langBtn");
const themeBtn = document.getElementById("themeBtn");

let currentLang = localStorage.getItem("language") || "en";
let currentTheme = localStorage.getItem("theme") || "light";


function changeLanguage() {

    document.documentElement.lang = currentLang;

    document.documentElement.dir =
        currentLang === "ar" ? "rtl" : "ltr";

    document.body.classList.toggle(
        "arabic",
        currentLang === "ar"
    );

    document.querySelectorAll("[data-en][data-ar]").forEach(element => {

        element.textContent =
            currentLang === "ar"
                ? element.dataset.ar
                : element.dataset.en;

    });

    document.querySelectorAll("[data-placeholder-en]").forEach(element => {

        element.placeholder =
            currentLang === "ar"
                ? element.dataset.placeholderAr
                : element.dataset.placeholderEn;

    });

    langBtn.textContent =
        currentLang === "en" ? "العربية" : "English";

    localStorage.setItem("language", currentLang);

}


langBtn.addEventListener("click", function () {

    currentLang = currentLang === "en" ? "ar" : "en";

    changeLanguage();

});


function changeTheme() {

    document.body.classList.toggle(
        "dark-mode",
        currentTheme === "dark"
    );

    themeBtn.innerHTML =
        currentTheme === "dark"
            ? '<i class="bi bi-sun"></i>'
            : '<i class="bi bi-moon"></i>';

    localStorage.setItem("theme", currentTheme);

}


themeBtn.addEventListener("click", function () {

    currentTheme =
        currentTheme === "light" ? "dark" : "light";

    changeTheme();

});


changeLanguage();
changeTheme();
const addButtons = document.querySelectorAll(".add-to-cart");

addButtons.forEach(button => {

    button.addEventListener("click", function () {

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        let product = {
            name: this.dataset.name,
            price: Number(this.dataset.price),
            image: this.dataset.image
        };

        cart.push(product);

        localStorage.setItem("cart", JSON.stringify(cart));

        alert("Product added to cart!");

    });

});