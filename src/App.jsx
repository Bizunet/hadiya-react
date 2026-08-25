import { HashRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Report from "./pages/Report";
import Administrators from "./pages/Administrators";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Admin from "./pages/Admin";
import ScrollToTop from "./components/ScrollToTop";
import BackToTop from "./components/BackToTop";

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/report" element={<Report />} />
            <Route path="/administrators" element={<Administrators />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Routes>
        <BackToTop />
      </HashRouter>
    </AppProvider>
  );
}
