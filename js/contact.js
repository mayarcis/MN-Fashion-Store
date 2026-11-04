let currentLang = localStorage.getItem("language") || "en";
let currentTheme = localStorage.getItem("theme") || "light";

function changeLanguage() {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";

    document.querySelectorAll("[data-en][data-ar]").forEach(function(element) {
        element.textContent = currentLang === "ar"
            ? element.dataset.ar
            : element.dataset.en;
    });

    document.querySelectorAll("[data-placeholder-en][data-placeholder-ar]").forEach(function(element) {
        element.placeholder = currentLang === "ar"
            ? element.dataset.placeholderAr
            : element.dataset.placeholderEn;
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

changeLanguage();
changeTheme()

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        document.getElementById("contactSuccess").style.display = "block";

        contactForm.reset();
    });
}