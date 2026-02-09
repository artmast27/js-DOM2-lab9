const API_URL = "https://picsum.photos/v2/list";

// завантаження унікальних фото
export async function fetchImages(limit = 4, usedIds) {
  const response = await fetch(`${API_URL}?limit=100`);
  const data = await response.json();

  const result = [];

  for (const img of data) {
    if (!usedIds.has(img.id)) {
      usedIds.add(img.id);
      result.push(img);
    }
    if (result.length === limit) break;
  }

  return result;
}

