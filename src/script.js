const API_URL = "https://picsum.photos/v2/list";

const gallery = document.getElementById("gallery");
const btnLoadMore = document.getElementById("load-more");
const btnClear = document.getElementById("clear");
const btnRemoveLast = document.getElementById("remove-last");
const btnReverse = document.getElementById("reverse");

// Стани
const state = {
  images: [],
  usedIds: new Set(),
};

// Завантаження унікальних фото
async function fetchImages(limit = 4) {
  const response = await fetch(`${API_URL}?limit=100`);
  const data = await response.json();

  const result = [];

  for (const item of data) {
    if (!state.usedIds.has(item.id)) {
      state.usedIds.add(item.id);
      result.push(item);
    }
    if (result.length === limit) break;
  }

  return result;
}

// Додаємо фото в галерею
async function loadImages(count = 4) {
  const newImages = await fetchImages(count);
  state.images = [...state.images, ...newImages];
  renderGallery();
}

// Малюємо галерею
function renderGallery() {
  gallery.innerHTML = "";

  state.images.forEach((img) => {
    const card = document.createElement("div");
    card.className = "gallery-item";

    card.innerHTML = `
      <img src="https://picsum.photos/id/${img.id}/400/300" alt="Photo by ${img.author}">
      <div class="gallery-item__info">Автор: ${img.author}</div>
    `;
    gallery.appendChild(card);
  });
}

// Кнопки
btnLoadMore.addEventListener("click", () => loadImages(4));

btnClear.addEventListener("click", () => {
  state.images = [];
  state.usedIds.clear();
  renderGallery();
});

btnRemoveLast.addEventListener("click", () => {
  state.images.pop();
  renderGallery();
});

btnReverse.addEventListener("click", () => {
  state.images.reverse();
  renderGallery();
});

// Перші 4 фото при завантаженні
document.addEventListener("DOMContentLoaded", () => {
  loadImages(4);
});

