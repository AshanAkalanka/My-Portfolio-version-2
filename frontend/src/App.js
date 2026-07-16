import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";

function App() {
    return (
        <ThemeProvider>
            <MotionConfig reducedMotion="user">
                <Router>
                    <div className="app-shell page-dark-bg flex flex-col transition-colors duration-300">
                        <Navbar />

                        <main className="flex-grow">
                            <Routes>
                                <Route path="/" element={<Home />} />

                                {/* Featured projects section (optional page route) */}
                                <Route path="/featured-projects" element={<Projects />} />

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
