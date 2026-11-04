import { Link } from "react-router";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <Link to="/">mini board</Link>
        <span>글을 읽고 댓글을 살펴보는 작은 게시판.</span>
      </div>
    </footer>
  );
}

export default Footer;
