import { API_URL } from "./config.js";

export default async function getData() {
  const res = await fetch(`${API_URL}/api/posts`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getPost(id) {
  const res = await fetch(`${API_URL}/api/posts/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getMyPosts() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/posts/mine`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function createPost() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/posts`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      title: "New Post",
      content: "New Post Content",
      published: true,
    }),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
