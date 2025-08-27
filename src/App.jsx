import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Parcours from "./pages/Parcours";

const isProd = import.meta.env.PROD;

const futureFlags = {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
};

export default function App() {
    const Router = isProd ? HashRouter : BrowserRouter;

    return (
        <Router future={futureFlags}>
            <a href='#main' className='skip-link'>
                Aller au contenu
            </a>

            <Header />

            <main id='main' className='portfolio' role='main'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/projects' element={<Projects />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/parcours' element={<Parcours />} />
                </Routes>
            </main>

            <Footer />
        </Router>
    );
}
