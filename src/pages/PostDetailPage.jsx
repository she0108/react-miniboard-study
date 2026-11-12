import { useEffect, useState } from "react";
import { getPost } from "../api/posts.js";
import { Link, useParams } from "react-router";
import Comments from "../components/Comments.jsx";
import backArrow from "../assets/back-arrow.svg";

function BackLink() {
  return (
    <Link to="/" className="back-link">
      <img src={backArrow} alt="" width="16" height="16" />
      게시글 목록
    </Link>
  );
}

function PostDetailPage() {
  const { id } = useParams();
  const [result, setResult] = useState({
    id: null,
    post: null,
    isError: false,
  });
  const isLoading = result.id !== id;
  const { post, isError } = result;

  useEffect(() => {
    async function loadPost() {
      try {
        const post = await getPost(id);
        setResult({ id, post, isError: false });
      } catch {
        setResult({ id, post: null, isError: true });
      }
    }

    loadPost();
  }, [id]);

  if (!isLoading && !isError && post) {
    return (
      <article>
        <header className="post-banner">
          <div className="container">
            <BackLink />
            <h1>{post.title}</h1>
          </div>
        </header>
        <div className="container post-content">
          <p className="post-body">{post.body}</p>
          <Comments key={post.id} postId={post.id} />
        </div>
      </article>
    );
  }

  return (
    <section className="container status-page">
      <BackLink />
      {isLoading ? (
        <p role="status" className="status">
          게시글을 불러오는 중입니다.
        </p>
      ) : isError ? (
        <p role="alert" className="error">
          게시글을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
        </p>
      ) : (
        <div className="not-found">
          <h1>게시글이 없습니다</h1>
          <p>목록에서 다른 게시글을 선택해주세요.</p>
        </div>
      )}
    </section>
  );
}

export default PostDetailPage;
