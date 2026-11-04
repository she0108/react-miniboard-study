import { Link } from "react-router";

function PostCard({ post }) {
  return (
    <article className="post-card">
      <Link to={`/posts/${post.id}`}>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </Link>
    </article>
  );
}

export default PostCard;
