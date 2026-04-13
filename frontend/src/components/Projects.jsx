import React from "react";
import { FaGithub } from "react-icons/fa";
import project1 from "../images/expense.png";
import project2 from "../images/portfolio.png";
import project3 from "../images/event.jpg";
import project4 from "../images/Weather_app.png";
import project5 from "../images/EduFlow.png";
import project6 from "../images/TravelGo.png";
import project7 from "../images/foodapp.png";
import project8 from "../images/grocery.png";

const projects = [
    {
        title: "EduFlow",
        description: "A comprehensive learning management system",
        tech: ["React", "Node.js", "Express", "MySQL"],
        image: project5,
        link: "https://github.com/AshanAkalanka",
    },
    {
        title: "Travel Go",
        description: "A modern booking platform for travel and tours",
        tech: ["React", "Tailwind CSS", "MongoDB"],
        image: project6,
        link: "https://github.com/AshanAkalanka",
    },
    {
        title: "Food Mobile App",
        description: "A mobile food ordering application with real-time data handling",
        tech: ["React Native", "MongoDB"],
        image: project7,
        link: "https://github.com/AshanAkalanka",
    },
    {
        title: "AI Powered Grocery System",
        description: "An intelligent grocery management system with AI-driven features and automation",
        tech: ["Python", "React", "PostgreSQL"],
        image: project8,
        link: "https://github.com/AshanAkalanka",
    },
    {
        title: "Expenses Tracker",
        description: "Web application that helps users to manage income and expenses",
        tech: ["Java", "React", "Node.js", "MySQL"],
        image: project1,
        link: "https://github.com/AshanAkalanka",
    },
    {
        title: "My Portfolio",
        description: "My personal portfolio website design and built by me",
        tech: ["React.js", "Tailwind CSS", "Node.js", "MySQL"],
        image: project2,
        link: "https://github.com/AshanAkalanka",
    },
    {
        title: "Event Management System",
        description: "Web-based application to simplify planning and management of events",
        tech: ["Java Spring Boot", "HTML", "CSS", "JavaScript"],
        image: project3,
        link: "https://github.com/AshanAkalanka",
    },
    {
        title: "Live Weather Website",
        description: "A web-based weather app to show weather forecast and live weather",
        tech: ["React", "NodeJs", "OpenWeather API"],
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
            {/* Subtle Background Glows */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#5AA9FF]/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 w-full px-4 md:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 max-w-7xl mx-auto">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                            Featured <span className="text-blue-600 dark:text-[#5AA9FF]">Projects</span>
                        </h2>
                        <p className="theme-text-subtle text-gray-700 dark:text-gray-400 mt-3 max-w-xl transition-colors duration-300">
                            A selection of my recent work in UI design and full-stack development.
                        </p>
                    </div>

                    <div className="flex gap-4 flex-wrap">
                        <a
                            href="https://github.com/AshanAkalanka"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="theme-control theme-text-muted flex items-center gap-2 border border-gray-400 dark:border-gray-600 text-gray-800 px-5 py-2 rounded-full hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                            <FaGithub className="mr-2" /> View Projects on GitHub
                        </a>
                    </div>
                </div>

                {/* Project Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full pt-4">
                    {projects.map((project, index) => (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={index}
                            className="relative aspect-[4/3] group overflow-hidden cursor-pointer bg-gray-100 dark:bg-gray-800"
                        >
                            {/* Background Image */}
                            <img
                                src={project.image}
                                alt={project.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 transition-opacity duration-300"></div>

                            {/* Top Right Icon */}
                            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/90 group-hover:bg-black/80 transition-all z-10">
                                <FaGithub className="w-5 h-5" />
                            </div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 p-5 md:p-6 flex flex-col justify-end w-full">
                                <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                                    {project.title}
                                </h3>
                                <p className="text-gray-300 text-sm font-medium">
                                    {project.tech.join(" • ")}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Projects;
