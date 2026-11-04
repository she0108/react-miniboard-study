import { Link } from "react-router";

function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="brand">
          mini board
        </Link>
      </div>
    </header>
  );
}

export default Header;
