// =====================================
// MOBILE NAVIGATION
// =====================================
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
    menuToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
});

// Close menu when clicking navigation links
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
});

// Close menu when clicking outside
document.addEventListener("click", (event) => {
    if (
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
    ) {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }
});

// =====================================
// GALLERY LIGHTBOX
// =====================================
const galleryImages = document.querySelectorAll("[data-gallery]");
const galleryLightbox = document.getElementById("galleryLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let currentImageIndex = 0;
const galleryArray = Array.from(galleryImages);

function openLightbox(index) {
    currentImageIndex = index;
    updateLightbox();
    galleryLightbox.classList.add("active");
    document.body.style.overflow = "hidden";
}

function updateLightbox() {
    const selectedImage = galleryArray[currentImageIndex];
    lightboxImage.src = selectedImage.src;
    lightboxImage.alt = selectedImage.alt;
    lightboxCaption.textContent = selectedImage.alt;
}

function closeLightbox() {
    galleryLightbox.classList.remove("active");
    document.body.style.overflow = "";
}

function showNextImage() {
    currentImageIndex =
        (currentImageIndex + 1) % galleryArray.length;
    updateLightbox();
}

function showPreviousImage() {
    currentImageIndex =
        (currentImageIndex - 1 + galleryArray.length)
        % galleryArray.length;
    updateLightbox();
}

// Open selected image
galleryArray.forEach((image, index) => {
    
    // Get the parent gallery item
    const galleryItem = image.closest(".gallery-item");

    // Attach click event to the complete gallery card
    galleryItem.addEventListener("click", () => {
        openLightbox(index);
    });
});

// Close button
lightboxClose.addEventListener("click", closeLightbox);

// Navigation
lightboxNext.addEventListener("click", showNextImage);
lightboxPrev.addEventListener("click", showPreviousImage);

// Close when clicking outside image
galleryLightbox.addEventListener("click", (event) => {
    if (event.target === galleryLightbox) {
        closeLightbox();
    }
});

// Keyboard controls
document.addEventListener("keydown", (event) => {
    if (!galleryLightbox.classList.contains("active")) {
        return;
    }

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowRight") {
        showNextImage();
    }

    if (event.key === "ArrowLeft") {
        showPreviousImage();
    }
});