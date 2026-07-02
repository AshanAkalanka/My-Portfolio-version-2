import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import project1 from "../images/expense.png";
import project2 from "../images/portfolio.png";
import project3 from "../images/event.jpg";
import project4 from "../images/Weather_app.png";
import project5 from "../images/EduFlow.png";
import project6 from "../images/TravelGo.png";
import project8 from "../images/grocery.png";

const projects = [
    {
        title: "EduFlow",
        highlight: "Educational Website",
        description: "A comprehensive learning management system built to streamline course delivery and student tracking.",
        tech: ["React", "Node.js", "Express", "MySQL"],
        image: project5,
        link: "https://github.com/AshanAkalanka",
    },
    {
        title: "Travel Go",
        highlight: "Travel Website",
        description: "A modern booking platform for travel and tours with real-time availability and seamless checkout.",
        tech: ["React", "Tailwind CSS", "MongoDB"],
        image: project6,
        link: "https://github.com/AshanAkalanka",
    },
    {
        title: "AI Grocery System",
        highlight: "AI-powered Website For Grocery Shop",
        description: "An intelligent grocery management system with AI-driven features, smart recommendations and automation.",
        tech: ["Python", "React", "PostgreSQL"],
        image: project8,
        link: "https://github.com/AshanAkalanka",
    },
    {
        title: "Expenses Tracker",
        highlight: "Expenses Tracker Website",
        description: "A web application that helps users manage income and expenses with clear visual breakdowns.",
        tech: ["Java", "React", "Node.js", "MySQL"],
        image: project1,
        link: "https://github.com/AshanAkalanka",
    },
    {
        title: "My Portfolio",
        highlight: "Portfolio",
        description: "My personal portfolio website — designed and built from scratch to showcase my work and growth.",
        tech: ["React.js", "Tailwind CSS", "Node.js"],
        image: project2,
        link: "https://github.com/AshanAkalanka",
    },
    {
        title: "Event Management System",
        highlight: "Event Management System",
        description: "A web-based application to simplify the planning and management of events end-to-end.",
        tech: ["Java Spring Boot", "HTML", "CSS", "JavaScript"],
        image: project3,
        link: "https://github.com/AshanAkalanka",
    },
    {
        title: "Live Weather Website",
        highlight: "Weather Website",
        description: "A weather app showing live forecasts and conditions powered by the OpenWeather API.",
        tech: ["React", "Node.js", "OpenWeather API"],
        image: project4,
        link: "https://github.com/AshanAkalanka",
    },
];

function Projects() {
    return (
        <section
            id="projects"
            className="theme-section py-20 bg-white transition-colors duration-300 relative overflow-hidden"
        >
            <div className="relative z-10 w-full px-4 md:px-8 lg:px-12 mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
                    <div>
                        <h2 className="text-4xl font-bold uppercase tracking-widest text-gray-900 dark:text-white transition-colors duration-300">
                            Featured <span className="text-primary dark:text-[#D4C990]">Projects</span>
                        </h2>
                        <p className="mt-3 text-[15px] text-gray-600 dark:text-gray-400 max-w-md leading-relaxed transition-colors duration-300">
                            A selection of my recent work in UI design and full-stack development.
                        </p>
                    </div>

                    <a
                        href="https://github.com/AshanAkalanka"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-[#D4C990] text-white dark:text-gray-900 font-semibold text-sm hover:opacity-90 transition-all duration-300 self-start md:self-auto whitespace-nowrap"
                    >
                        <FaGithub className="text-base" />
                        View on GitHub
                    </a>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {projects.map((project, index) => (
                        <motion.a
                            key={index}
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.07 }}
                            className="group flex flex-col cursor-pointer bg-[#f0f4f8] dark:bg-gray-800/40 hover:bg-[#e2e8f0] dark:hover:bg-gray-800/60 transition-colors duration-300"
                        >
                            {/* Image */}
                            <div className="overflow-hidden w-full aspect-[3/2] bg-gray-100 dark:bg-gray-800">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>

                            {/* Text below image */}
                            <div className="p-6 md:p-8 flex flex-col flex-grow">
                                <p className="text-[12px] md:text-[13px] uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 font-medium">
                                    {project.tech.join(" · ")}
                                </p>
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-snug transition-colors duration-300 mb-3">
                                    {" "}
                                    <span className="text-primary dark:text-[#D4C990]">
                                        {project.highlight}
                                    </span>
                                </h3>
                                <p className="text-[14px] md:text-[15px] text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                                    {project.description}
                                </p>
                            </div>
                        </motion.a>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default Projects;
