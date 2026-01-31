const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5173";
const RES_API_BASE = import.meta.env.VITE_RES_API_BASE || "http://localhost:5173";

export async function login({ userName, password }) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName, password }),
  });
  if (!res.ok) throw new Error("Login failed");

  const data = await res.json();
  return { token: data.token };
}