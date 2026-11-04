import { Outlet } from "react-router";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";

function App() {
  return (
    <div className="layout">
      <a href="#main-content" className="skip-link">
        본문으로 건너뛰기
      </a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
