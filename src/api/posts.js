import { API_BASE_URL } from "./config.js";

export async function getPosts() {
  const response = await fetch(`${API_BASE_URL}/posts?limit=10`);
  if (!response.ok) throw new Error("게시글 목록 조회 실패");

  const data = await response.json();
  return data.posts;
}

export async function getPost(id) {
  if (!/^[1-9]\d*$/.test(id)) return null;

  const response = await fetch(`${API_BASE_URL}/posts/${id}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("게시글 조회 실패");

  return response.json();
}
