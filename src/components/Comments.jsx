import { useEffect, useState } from "react";
import { getComments } from "../api/comments.js";

function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function loadComments() {
      try {
        const data = await getComments(postId);
        setComments(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    loadComments();
  }, [postId]);

  return (
    <section aria-labelledby="comments-title" className="comments">
      <h2 id="comments-title">댓글</h2>
      <CommentList
        isLoading={isLoading}
        isError={isError}
        comments={comments}
      />
    </section>
  );
}

function CommentList({ isLoading, isError, comments }) {
  if (isLoading) {
    return <p className="status">댓글을 불러오는 중입니다.</p>;
  }

  if (isError) {
    return (
      <p className="error">
        댓글을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
      </p>
    );
  }

  if (comments.length === 0) {
    return <p className="status">아직 댓글이 없습니다.</p>;
  }

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id} className="comment">
          <p className="comment-body">{comment.body}</p>
          <p className="comment-author">{comment.user.username}</p>
        </li>
      ))}
    </ul>
  );
}

export default Comments;
