import { Routes, Route, useLocation } from "react-router-dom";
import { Products } from "./components/Products/Products";
import { Home } from "./components/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Login from "./components/scenes-admin/Login/Login";
import { PanelProvider } from "./components/Contexts/PanelContext";
import CategoryPanel from "./components/CategorySlider/CategoryPanel";
import AdminDashboard from "./components/scenes-admin/AdminDashboard/AdminDashboard";
import { categoriesFromConfig } from "./components/configuration/ApiConfig";
import "./App.css";
import { LogoAnimationProvider } from "./components/Contexts/LogoAnimationContext";
import VideoOverlay from "./components/LogoAnimation/VideoOverlay";

import WishList from "./components/WishList/WishList";
import FloatingLabel from "./components/FloatingWishListLabel/FloatingLabel";
import SnackbarProvider from "./components/Contexts/SnackbarContext";
import AboutUs from "./components/AboutUs/AboutUs";

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
      <LogoAnimationProvider>
        <VideoOverlay/>
        <PanelProvider>
          <SnackbarProvider>
            <CategoryPanel />
            <Header />
            <Routes>
              <Route path="/products" element={<Products categoryFromRoute={categoriesFromConfig[0]}/>}></Route>
              <Route path="/camp-furnitures" element={<Products categoryFromRoute={categoriesFromConfig[0]}/>}></Route>
              <Route path="/office-furnitures" element={<Products categoryFromRoute={categoriesFromConfig[2]}/>}></Route>
              <Route path="/" element={<Home />}></Route>
              <Route path="/auth/admin-login" element={<Login />}></Route>
              <Route path="/admin-dashboard" element={<AdminDashboard />}></Route>
              <Route path="/wish-list" element={<WishList />}></Route>
              <Route path="/about" element={<AboutUs />}></Route>
              <Route path="/contact" element={<AboutUs />}></Route>
            </Routes>
            <FloatingLabel />
            <Footer />
          </SnackbarProvider>
        </PanelProvider>
      </LogoAnimationProvider>
    </>
  );
}

export default App;
