import { Routes, Route } from "react-router-dom";
import { Products } from "./components/Products/Products";
import { Home } from "./components/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Login from "./components/scenes-admin/Login/Login";
import AdminDashboard from "./components/scenes-admin/AdminDashboard/AdminDashboard";
import "./App.css";

function App() {
  const fontLinkHref =
    "https://fonts.googleapis.com/css2?family=Barlow:wght@100;300;400;500;600&family=Nunito:wght@300;500;700&display=swap";

  // Check if the link already exists
  let existingLink = document.head.querySelector(
    `link[href="${fontLinkHref}"]`
  );
  if (!existingLink) {
    // Create a new link element if it does not exist
    var link = document.createElement("link");
    link.href = fontLinkHref;
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/auth/admin-login" element={<Login />}></Route>
        <Route path="/admin-dashboard" element={<AdminDashboard />}></Route>
      </Routes>
    </>
  );
}

export default App;
