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
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function loadPost() {
      try {
        setPost(await getPost(id));
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    loadPost();
  }, [id]);

  return (
    <article>
      <header className="post-banner">
        <div className="container">
          <BackLink />
          {post && <h1>{post.title}</h1>}
        </div>
      </header>
      <div className="container post-content">
        <PostContent isLoading={isLoading} isError={isError} post={post} />
      </div>
    </article>
  );
}

function PostContent({ isLoading, isError, post }) {
  if (isLoading) {
    return <p className="status">게시글을 불러오는 중입니다.</p>;
  }

  if (isError) {
    return (
      <p className="error">
        게시글을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
      </p>
    );
  }

  if (!post) {
    return (
      <div className="not-found">
        <h1>게시글이 없습니다</h1>
        <p>목록에서 다른 게시글을 선택해주세요.</p>
      </div>
    );
  }

  return (
    <>
      <p className="post-body">{post.body}</p>
      <Comments key={post.id} postId={post.id} />
    </>
  );
}

export default PostDetailPage;
