import { fetchImages } from "./api.js";
import {
  renderImages,
  clearGallery,
  removeLastImage,
  reverseGallery
} from "./gallery.js";

const btnLoadMore = document.getElementById("load-more");
const btnClear = document.getElementById("clear");
const btnRemoveLast = document.getElementById("remove-last");
const btnReverse = document.getElementById("reverse");

// Стан
const state = {
  images: [],
  usedIds: new Set(),
};

// Завантаження фото
async function loadImages(count = 4) {
  const newImages = await fetchImages(count, state.usedIds);
  state.images.push(...newImages);
  renderImages(newImages);
}

// Кнопки
btnLoadMore.addEventListener("click", () => loadImages(4));

btnClear.addEventListener("click", () => {
  clearGallery();
  state.images = [];
  state.usedIds.clear();
});

btnRemoveLast.addEventListener("click", () => {
  removeLastImage();
  state.images.pop();
});

btnReverse.addEventListener("click", () => {
  reverseGallery();
  state.images.reverse();
});

// Перші фото при завантаженні
document.addEventListener("DOMContentLoaded", () => {
  loadImages(4);
});

