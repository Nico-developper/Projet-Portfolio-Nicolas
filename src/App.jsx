import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Login from './components/Login';
import Footer from './components/Footer';
import HomeBackground from './components/HomeBackground';
import Services from './pages/Services';
import ScrollToTop from './components/ScrollToTop';

const isProd = import.meta.env.PROD;

const futureFlags = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
};

export default function App() {
  const Router = isProd ? HashRouter : BrowserRouter;

  return (
    <Router future={futureFlags}>
      <a href="#main" className="skip-link">
        Aller au contenu
      </a>
      {/* Scroll to top on route change */}
      <ScrollToTop behavior="auto" /> {/* change en "smooth" si tu veux une animation */}
      <HomeBackground />
      <Header />
      <main id="main" className="portfolio" role="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/services" element={<Services />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}
