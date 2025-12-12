import { API_BASE } from "../constants/api";

export async function getItems() {
  const res = await fetch(`${API_BASE}/api/items`);
  if (!res.ok) throw new Error(`Failed to load items: ${res.status}`);
  return res.json();
}

export async function createItem(body) {
  const res = await fetch(`${API_BASE}/api/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Failed to create item: ${res.status}`);
  return res.json();
}

export async function updateItem(id, body) {
  const res = await fetch(`${API_BASE}/api/items/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Failed to update item: ${res.status}`);
  return res.json();
}

export async function removeItem(id) {
  const res = await fetch(`${API_BASE}/api/items/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Failed to delete item: ${res.status}`);
}

export async function toggleFavorite(id) {
  const res = await fetch(`${API_BASE}/api/items/${id}/favorite`, { method: "PATCH" });
  if (!res.ok) throw new Error(`Failed to toggle favorite: ${res.status}`);
  return res.json();
}

export async function toggleComplete(id) {
  const res = await fetch(`${API_BASE}/api/items/${id}/complete`, { method: "PATCH" });
  if (!res.ok) throw new Error(`Failed to toggle complete: ${res.status}`);
  return res.json();
}
