import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaStar } from "react-icons/fa";
import project1 from "../images/expense.png";
import project2 from "../images/portfolio.png";
import project3 from "../images/event.jpg";
import project4 from "../images/Weather_app.png";

const projects = [
    {
        title: "Expenses Tracker",
        description:
            "Web application that helps users to manage income and expenses",
        tech: ["Java", "React", "Node.js", "MySQL"],
        image: project1,
        link: "https://github.com/",
    },
    {
        title: "My Portfolio",
        description:
            "My personal portfolio website design and built by me",
        tech: ["React.js", "Tailwind CSS", "Node.js", "MySQL"],
        image: project2,
        link: "https://github.com/",
    },
    {
        title: "Event Management System",
        description:
            "Web-based application to simplify planning and management of events",
        tech: ["Java Spring Boot", "HTML", "CSS", "JavaScript"],
        image: project3,
        link: "https://github.com/",
    },
    {
        title: "Live Weather Website",
        description:
            "A web-based weather app to show weather forecast and live weather",
        tech: ["React", "NodeJs", "OpenWeather API"],
        image: project4,
        link: "https://github.com/",
    },
];

function Projects() {
    const bgIcons = [
        FaStar
    ];

    const scrollRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = () => {
        if (scrollRef.current) {
            const container = scrollRef.current;
            const containerRect = container.getBoundingClientRect();
            const containerCenter = containerRect.left + container.clientWidth / 2;

            let closestIndex = 0;
            let minDistance = Infinity;

            Array.from(container.children).forEach((child, index) => {
                const childRect = child.getBoundingClientRect();
                const childCenter = childRect.left + childRect.width / 2;
                const distance = Math.abs(containerCenter - childCenter);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestIndex = index;
                }
            });

            setActiveIndex(closestIndex);
        }
    };

    const scrollTo = (index) => {
        if (scrollRef.current) {
            const container = scrollRef.current;
            const child = container.children[index];
            if (child) {
                const containerRect = container.getBoundingClientRect();
                const childRect = child.getBoundingClientRect();
                const scrollPos = container.scrollLeft + childRect.left - containerRect.left - (containerRect.width / 2) + (childRect.width / 2);

                container.scrollTo({
                    left: scrollPos,
                    behavior: "smooth"
                });
            }
            setActiveIndex(index);
        }
    };

    // Auto-scroll every 3.5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (activeIndex + 1) % projects.length;
            scrollTo(nextIndex);
        }, 3500);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeIndex]);

    return (
        <section
            id="projects"
            className="py-20 bg-white dark:bg-[#0a192f] transition-colors duration-300 relative overflow-hidden"
        >
            {/* MOVING ICONS (Removed) */}

            <div className="relative z-10 w-full px-4 md:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 max-w-7xl mx-auto">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                            Featured <span className="text-blue-600 dark:text-[#64ffda]">Projects</span>
                        </h2>
                        <p className="text-gray-700 dark:text-gray-400 mt-3 max-w-xl transition-colors duration-300">
                            A selection of my recent work in UI design and full-stack development.
                        </p>
                    </div>

                    <div className="flex gap-4 flex-wrap">
                        <a
                            href="https://github.com/AshanAkalanka"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 border border-gray-400 dark:border-gray-600 text-gray-800 dark:text-gray-300 px-5 py-2 rounded-full hover:bg-white dark:hover:bg-gray-800 transition"
                        >
                            <FaGithub /> View Projects on GitHub
                        </a>
                    </div>
                </div>

                {/* Project Cards */}
                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex overflow-x-auto gap-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-8 pt-4 px-4 md:px-12 w-full"
                >
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="relative min-w-[90%] md:min-w-[65%] lg:min-w-[850px] h-[400px] md:h-[500px] rounded-xl md:rounded-2xl overflow-hidden snap-center shrink-0 group shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)]"
                        >
                            {/* Background Image */}
                            <img
                                src={project.image}
                                alt={project.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* Gradient Overlay for consistent text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 transition-opacity duration-300"></div>

                            {/* Content */}
                            <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                                    <div className="flex-1">
                                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 max-w-2xl leading-tight font-caveat">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-300 text-xs md:text-sm max-w-xl mb-4 line-clamp-3 md:line-clamp-none font-medium">
                                            {project.description}
                                        </p>

                                        {/* Tech stack */}
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.map((t, i) => (
                                                <span
                                                    key={i}
                                                    className="text-[11px] md:text-xs px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-md border border-white/10"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold text-xs md:text-sm whitespace-nowrap hover:bg-blue-700 hover:scale-105 transition-all duration-300 shrink-0 shadow-lg self-start md:self-auto flex items-center justify-center gap-2"
                                    >
                                        View Project
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center items-center gap-2 mt-4">
                    {projects.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => scrollTo(i)}
                            className={`relative h-2 rounded-full overflow-hidden transition-all duration-300 ${activeIndex === i
                                ? "w-8 bg-gray-300 dark:bg-gray-700"
                                : "w-2 bg-gray-400 dark:bg-gray-600"
                                }`}
                            aria-label={`Go to slide ${i + 1}`}
                        >
                            {activeIndex === i && (
                                <motion.div
                                    className="absolute top-0 left-0 h-full bg-gray-800 dark:bg-white"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 3, ease: "linear" }}
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Projects;
