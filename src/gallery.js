const gallery = document.getElementById("gallery");

export function renderImages(images) {
  images.forEach(img => {
    const image = document.createElement("img");
    image.src = img.download_url;
    image.alt = img.author;
    image.dataset.id = img.id;
    gallery.appendChild(image);
  });
}

export function clearGallery() {
  gallery.innerHTML = "";
}

export function removeLastImage() {
  if (gallery.lastChild) {
    gallery.removeChild(gallery.lastChild);
  }
}

export function reverseGallery() {
  const images = Array.from(gallery.children);
  gallery.innerHTML = "";
  images.reverse().forEach(img => gallery.appendChild(img));
}
