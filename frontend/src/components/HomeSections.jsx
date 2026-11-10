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
            <SectionTransition id="about" title="About Me" caption="The person behind the work" hideTitleOnDesktop hideTitleOnMobile><About id={null} /></SectionTransition>
            <SectionTransition id="skills" title="My Skills" caption="The tools behind the ideas" hideTitleOnDesktop hideTitleOnMobile><Skills id={null} /></SectionTransition>
            <SectionTransition id="education" title="Education" caption="Always learning and growing" hideTitleOnDesktop hideTitleOnMobile><Education id={null} /></SectionTransition>
            <SectionTransition id="contact" title="Let's Connect" caption="Good things start with a conversation" hideTitleOnDesktop><Contact id={null} /></SectionTransition>
        </>
    );
}
