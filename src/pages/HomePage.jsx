import { useEffect, useState } from "react";
import { getPosts } from "../api/posts.js";
import PostCard from "../components/PostCard.jsx";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    loadPosts();
  }, []);

  return (
    <>
      <section className="home-banner">
        <h1>mini board</h1>
        <p>글을 읽고 댓글을 살펴보는 작은 게시판.</p>
      </section>
      <section aria-label="게시글 목록" className="container post-section">
        <PostList isLoading={isLoading} isError={isError} posts={posts} />
      </section>
    </>
  );
}

function PostList({ isLoading, isError, posts }) {
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

  if (posts.length === 0) {
    return <p className="status">아직 게시글이 없습니다.</p>;
  }

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
}

export default HomePage;
