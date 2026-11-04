import { API_BASE_URL } from "./config.js";

export async function getComments(postId) {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`);
  if (!response.ok) throw new Error("댓글 조회 실패");

  const data = await response.json();
  return data.comments;
}
