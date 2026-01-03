import "./style.css";
import { catalogData } from "./data/catalog.js";
import { getResellerInfo, sanitizeParams } from "./utils/urlParams.js";

// Initialize application
document.addEventListener("DOMContentLoaded", () => {
  // Get reseller info from URL
  const reseller = getResellerInfo();

  // Update reseller ID display
  document.getElementById("resellerId").textContent = reseller.id;

  // Initialize all components
  initCatalog();
  initEventListeners();
  initWhatsAppButtons(reseller);
  initMobileMenu();
  initCategoryFilter();
});

// Initialize Catalog
function initCatalog() {
  const catalogGrid = document.getElementById("catalogGrid");
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  let currentPage = 1;
  const itemsPerPage = 9; // Tampilkan 9 item per halaman
  let currentCategory = "all";
  let filteredData = catalogData;

  function renderCatalog() {
    const startIndex = 0;
    const endIndex = currentPage * itemsPerPage;
    const itemsToShow = filteredData.slice(startIndex, endIndex);

    catalogGrid.innerHTML = itemsToShow
      .map(
        (item) => `
      <div class="catalog-card animate-fade-in" data-category="${item.category}">
        <div class="relative">
          <img src="${item.image}" alt="${item.title}" class="card-image">
          <span class="card-badge">${item.category}</span>
        </div>
        <div class="card-content">
          <h3 class="card-title">${item.title}</h3>
          <p class="card-description">${item.description}</p>
          <div class="card-price">${item.price}</div>
          <div class="flex space-x-2 mt-4">
            <button class="flex-1 py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors whatsapp-btn"
                    data-theme="${item.title}"
                    data-category="${item.category}">
              Pilih Tema
            </button>
            <a href="${item.demoLink}" target="_blank" 
               class="flex-1 py-3 rounded-lg border-2 border-primary-600 text-primary-600 font-semibold hover:bg-primary-50 transition-colors text-center">
              Lihat Contoh
            </a>
          </div>
        </div>
      </div>
    `
      )
      .join("");

    // Show/Hide load more button
    loadMoreBtn.style.display =
      filteredData.length > endIndex ? "block" : "none";
  }

  function filterByCategory(category) {
    currentCategory = category;
    currentPage = 1;

    if (category === "all") {
      filteredData = catalogData;
    } else {
      filteredData = catalogData.filter((item) => item.category === category);
    }

    renderCatalog();
  }

  // Initial render
  renderCatalog();

  // Load more functionality
  loadMoreBtn.addEventListener("click", () => {
    currentPage++;
    renderCatalog();
  });

  // Expose filter function for category buttons
  window.filterCatalog = filterByCategory;
}

// Initialize Event Listeners
function initEventListeners() {
  // Scroll to catalog
  document.getElementById("lihatKatalog").addEventListener("click", () => {
    document.getElementById("catalog").scrollIntoView({ behavior: "smooth" });
  });

  // Category filter buttons
  const categoryButtons = document.querySelectorAll(".category-btn");
  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      button.classList.add("active");

      // Filter catalog
      const category = button.dataset.category;
      window.filterCatalog(category);
    });
  });

  // Footer category links
  document.querySelectorAll("[data-category]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const category = link.dataset.category;

      // Update active button
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      const targetBtn = document.querySelector(`[data-category="${category}"]`);
      if (targetBtn) targetBtn.classList.add("active");

      // Filter and scroll to catalog
      window.filterCatalog(category);
      document.getElementById("catalog").scrollIntoView({ behavior: "smooth" });
    });
  });
}

// Initialize WhatsApp Buttons
function initWhatsAppButtons(reseller) {
  const phoneNumber = reseller.phone;
  const defaultMessage = `Halo, saya ingin konsultasi tentang undangan digital. Bisa dibantu?`;

  function getWhatsAppLink(additionalText = "") {
    const message = additionalText
      ? `${defaultMessage}\n\n${additionalText}`
      : defaultMessage;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  }

  // Add click event to all WhatsApp buttons
  document.querySelectorAll(".whatsapp-btn").forEach((button) => {
    button.addEventListener("click", () => {
      let additionalText = "";

      // Add theme info if available
      if (button.dataset.theme) {
        additionalText = `Saya tertarik dengan tema: ${button.dataset.theme}`;
        if (button.dataset.category) {
          additionalText += ` (Kategori: ${button.dataset.category})`;
        }
      }

      window.open(getWhatsAppLink(additionalText), "_blank");
    });
  });
}

// Initialize Mobile Menu
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.querySelector(".nav-links");

  mobileMenuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("hidden");
    navLinks.classList.toggle("flex");
    navLinks.classList.toggle("flex-col");
    navLinks.classList.toggle("absolute");
    navLinks.classList.toggle("top-16");
    navLinks.classList.toggle("left-0");
    navLinks.classList.toggle("right-0");
    navLinks.classList.toggle("bg-white");
    navLinks.classList.toggle("p-8");
    navLinks.classList.toggle("shadow-lg");
  });
}

// Initialize Category Filter
function initCategoryFilter() {
  // Already handled in initEventListeners
}

// Add Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-fade-in");
    }
  });
}, observerOptions);

// Observe catalog cards
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".catalog-card").forEach((card) => {
    observer.observe(card);
  });
});
