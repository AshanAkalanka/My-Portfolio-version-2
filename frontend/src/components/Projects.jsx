import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";
import ProgressiveImage from "./ProgressiveImage";
import project1 from "../images/111.png";
import project2 from "../images/pp.png";
import project3 from "../images/event.png";
import project4 from "../images/1.png";
import project5 from "../images/EduFlow.png";
import project6 from "../images/11.png";
import project8 from "../images/groceryy.png";

const projects = [
    {
        title: "Educational Website",
        description: "A comprehensive learning management system built to streamline course delivery and student tracking.",
        tech: ["React", "Node.js", "Express", "MySQL"],
        image: project5,
        link: "https://github.com/AshanAkalanka/Online-Course-Platform.git",
    },
    {
        title: "Travel Website",
        description: "A modern booking platform for travel and tours with real-time availability and seamless checkout.",
        tech: ["React", "Tailwind CSS", "MongoDB"],
        image: project6,
        link: "https://github.com/AshanAkalanka/Travel-Web.git",
    },
    {
        title: "AI Grocery System",
        description: "An intelligent grocery management system with AI-driven features, smart recommendations and automation.",
        tech: ["Python", "React", "PostgreSQL"],
        image: project8,
        link: "https://github.com/IT24101219/ai-grocery-project.git",
    },
    {
        title: "Expenses Tracker",
        description: "A web application that helps users manage income and expenses with clear visual breakdowns.",
        tech: ["Java", "React", "Node.js", "MySQL"],
        image: project1,
        link: "https://github.com/AshanAkalanka",
    },
    {
        title: "My Portfolio",
        description: "My personal portfolio website - designed and built from scratch to showcase my work and growth.",
        tech: ["React.js", "Tailwind CSS", "Node.js"],
        image: project2,
        link: "https://github.com/AshanAkalanka/My-Portfolio-version-2.git",
    },
    {
        title: "Event Management System",
        description: "A web-based application to simplify the planning and management of events end-to-end.",
        tech: ["Java Spring Boot", "HTML", "CSS", "JavaScript"],
        image: project3,
        link: "https://github.com/AshanAkalanka/Event-Management-System.git",
    },
    {
        title: "Live Weather Website",
        description: "A weather app showing live forecasts and conditions powered by the OpenWeather API.",
        tech: ["React", "Node.js", "OpenWeather API"],
        image: project4,
        link: "https://github.com/AshanAkalanka/Weather-App.git",
    },
];

function Projects() {
    return (
        <section
            id="projects"
            className="theme-section section-dark-projects scroll-mt-24 py-16 md:py-20 bg-white transition-colors duration-300 relative overflow-hidden"
        >
            <div className="relative z-10 w-full px-4 md:px-8 lg:px-12 mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
                    <div>
                        <h2 className="section-heading text-gray-900 dark:text-[#d7def7] transition-colors duration-300">
                            Featured <span className="text-[#2563EB] dark-accent-text">Projects</span>
                        </h2>
                        <p className="section-description mt-3 text-gray-600 dark:text-gray-400 transition-colors duration-300">
                            A selection of my recent work in full-stack development.
                        </p>
                    </div>

                    <a
                        href="https://github.com/AshanAkalanka"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-[#38BDF8] text-white dark:text-[#081a2f] font-semibold text-sm hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98] dark:hover:bg-[#0EA5E9] transition-all duration-300 self-start md:self-auto whitespace-nowrap"
                    >
                        <FaGithub className="text-base transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
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
                            aria-label={`View ${project.title} project on GitHub`}
                            className="project-card group flex flex-col cursor-pointer overflow-hidden rounded-xl bg-[#f0f4f8] dark:bg-gray-800/40 hover:-translate-y-1.5 hover:bg-[#e2e8f0] hover:shadow-xl dark:hover:bg-gray-800/60 transition-all duration-300"
                        >
                            {/* Image */}
                            <div className="relative overflow-hidden w-full aspect-video bg-gray-100 dark:bg-gray-800">
                                <ProgressiveImage
                                    src={project.image}
                                    alt={`${project.title} project preview`}
                                    wrapperClassName="h-full w-full"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.045]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            </div>

                            {/* Text below image */}
                            <div className="flex flex-grow flex-col p-5 md:p-6">
                                <h3 className="mb-2 text-xl font-bold leading-snug text-gray-900 transition-colors duration-300 group-hover:text-[#2563EB] dark:text-white dark:group-hover:text-[#38BDF8] md:text-2xl">
                                    {project.title}
                                </h3>
                                <p className="text-[13px] md:text-[14px] text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                                    {project.description}
                                </p>

                                <div className="mb-4 mt-4 flex flex-wrap gap-1.5">
                                    {project.tech.map((technology) => (
                                        <span
                                            key={technology}
                                            className="rounded-full border border-gray-300/80 bg-white/55 px-2.5 py-1 text-[10px] font-semibold text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-[#a8b3d1]"
                                        >
                                            {technology}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-auto flex items-center justify-between border-t border-gray-300/70 pt-4 text-sm font-semibold text-[#2563EB] dark:border-white/10 dark:text-[#38BDF8]">
                                    <span>View project</span>
                                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default Projects;
