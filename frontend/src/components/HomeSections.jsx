import About from "./About";
import Education from "./Education";
import Skills from "./Skills";
import Projects from "./Projects";
import Contact from "./Contact";
import SectionTransition from "./SectionTransition";

export default function HomeSections() {
    return (
        <>
            <SectionTransition id="projects" title="My Works" caption="Ideas brought to life"><Projects id={null} /></SectionTransition>
            <SectionTransition id="about" title="About Me" caption="The person behind the work"><About id={null} /></SectionTransition>
            <SectionTransition id="skills" title="My Skills" caption="The tools behind the ideas"><Skills id={null} /></SectionTransition>
            <SectionTransition id="education" title="My Journey" caption="Always learning and growing"><Education id={null} /></SectionTransition>
            <SectionTransition id="contact" title="Let's Connect" caption="Good things start with a conversation"><Contact id={null} /></SectionTransition>
        </>
    );
}
