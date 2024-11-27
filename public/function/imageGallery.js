let currentGallery = null;
let currentIndex = 0;

function setActiveGallery(gallery) {
    currentGallery = gallery;
    currentIndex = 0; // Reset index for the new gallery
}

function slideGallery(direction) {
    if (!currentGallery) return;

    const totalSlides = currentGallery.children.length;

    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    } else if (currentIndex >= totalSlides) {
        currentIndex = 0;
    }

    const offset = -currentIndex * 100;
    currentGallery.style.transform = `translateX(${offset}%)`;
}

// Example: Activate a gallery on click
document.querySelectorAll('.galleryContainer').forEach((projBox) => {
    projBox.addEventListener('mouseenter', () => {
        const gallery = projBox.querySelector('.galleryImageContainer');
        if (gallery) setActiveGallery(gallery);
    });
});

// Example: Navigation buttons
