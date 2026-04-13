import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import Home from "./pages/Home";

function App() {
    return (
        <ThemeProvider>
            <Router>
                <div className="page-dark-bg flex flex-col min-h-screen transition-colors duration-300">
                    <Navbar />

                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<Home />} />

                            {/* Featured projects section (optional page route) */}
                            <Route path="/featured-projects" element={<Projects />} />

                        </Routes>
                    </main>

                    <Footer />
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App;
