export default async function getData() {
  const res = await fetch("/api/posts");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getPost(id) {
  const res = await fetch(`/api/posts/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
