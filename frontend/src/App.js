import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ScrollProgress from "./components/ScrollProgress";
import Home from "./pages/Home";

const Projects = lazy(() => import("./components/Projects"));

function App() {
    return (
        <ThemeProvider>
            <MotionConfig reducedMotion="user">
                <Router>
                    <div className="app-shell page-dark-bg flex flex-col transition-colors duration-300">
                        <ScrollProgress />
                        <Navbar />

                        <main className="flex-grow">
                            <Routes>
                                <Route path="/" element={<Home />} />

                                {/* Featured projects section (optional page route) */}
                                <Route path="/featured-projects" element={<Suspense fallback={<div className="min-h-screen pt-28 text-center" role="status">Loading projects…</div>}><Projects /></Suspense>} />

                            </Routes>
                        </main>

                        <Footer />
                        <ScrollToTop />
                    </div>
                </Router>
            </MotionConfig>
        </ThemeProvider>
    );
}

export default App;
