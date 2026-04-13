import Hero from "../components/Hero";
import About from "../components/About";
import Education from "../components/Education";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "../components/Contact";

function Home() {
    return (
        <div>
            <Hero />
            <About />
            <Education />
            <Skills />
            <Projects />
            <Contact />
        </div>
    );
}

export default Home;
