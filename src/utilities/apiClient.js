import { API_BASE } from "../constants/api";

// Transform backend response to frontend format
function transformItem(item) {
  if (!item) return item;
  return {
    ...item,
    favorite: item.favorited,
    category: item.category?.name || item.category || "",
  };
}

function transformItems(items) {
  return Array.isArray(items) ? items.map(transformItem) : [];
}

export async function getItems() {
  const res = await fetch(`${API_BASE}/api/items`);
  if (!res.ok) throw new Error(`Failed to load items: ${res.status}`);
  const text = await res.text();
  const data = text ? JSON.parse(text) : [];
  return transformItems(data);
}

export async function createItem(body) {
  const payload = {
    name: body.name,
    quantity: body.quantity ?? 1,
    favorited: !!body.favorite,
    completed: !!body.completed,
    category: body.category ? { name: body.category } : null,
  };
  const res = await fetch(`${API_BASE}/api/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to create item: ${res.status}`);
  const data = await res.json();
  return transformItem(data);
}

export async function updateItem(id, body) {
  const payload = {
    name: body.name,
    quantity: body.quantity,
    favorited: body.favorite,
    completed: body.completed,
    category: body.category ? { name: body.category } : undefined,
  };
  const res = await fetch(`${API_BASE}/api/items/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to update item: ${res.status}`);
  const data = await res.json();
  return transformItem(data);
}

export async function removeItem(id) {
  const res = await fetch(`${API_BASE}/api/items/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Failed to delete item: ${res.status}`);
}

export async function toggleFavorite(id) {
  const res = await fetch(`${API_BASE}/api/items/${id}/favorite`, { method: "PATCH" });
  if (!res.ok) throw new Error(`Failed to toggle favorite: ${res.status}`);
  const data = await res.json();
  return transformItem(data);
}

export async function toggleComplete(id) {
  const res = await fetch(`${API_BASE}/api/items/${id}/complete`, { method: "PATCH" });
  if (!res.ok) throw new Error(`Failed to toggle complete: ${res.status}`);
  const data = await res.json();
  return transformItem(data);
}
