import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProgressiveImage from "./ProgressiveImage";
import projects from "../data/projects";

function Projects() {
    return (
        <section
            id="projects"
            className="theme-section section-dark-projects scroll-mt-24 py-16 md:py-20 bg-white transition-colors duration-300 relative overflow-hidden"
        >
            <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 md:px-8 lg:px-12">

                {/* Header */}
                <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
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
                <div className="grid grid-cols-1 gap-7 md:grid-cols-2 md:gap-8 lg:gap-10">
                    {projects.map((project, index) => (
                        <motion.article
                            key={project.slug}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.07 }}
                            className="project-card group flex flex-col overflow-hidden rounded-[1.5rem] bg-white shadow-[0_18px_55px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_70px_rgba(15,23,42,0.14)] dark:bg-gray-800/40 dark:hover:bg-gray-800/60 md:rounded-[1.75rem]"
                        >
                            <Link
                                to={`/projects/${project.slug}`}
                                aria-label={`View details for ${project.title}`}
                                className="relative block aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800"
                            >
                                <ProgressiveImage
                                    src={project.image}
                                    alt={`${project.title} website preview`}
                                    wrapperClassName="h-full w-full"
                                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.035]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-40 transition-opacity duration-300 group-hover:opacity-20" />
                            </Link>

                            <div className="flex flex-grow flex-col p-5 sm:p-6 md:p-7">
                                <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 dark:text-[#8f9ab8] md:text-xs">
                                    {project.category}
                                </p>

                                <Link to={`/projects/${project.slug}`} className="w-fit">
                                    <h3 className="text-xl font-extrabold uppercase leading-tight text-gray-950 transition-colors duration-300 group-hover:text-[#2563EB] dark:text-white dark:group-hover:text-[#38BDF8] sm:text-2xl">
                                        {project.title}
                                    </h3>
                                </Link>

                                <p className="mt-3 text-[13px] leading-relaxed text-gray-600 transition-colors duration-300 dark:text-gray-300 md:text-[14px]">
                                    {project.description}
                                </p>

                                <Link
                                    to={`/projects/${project.slug}`}
                                    className="mt-5 inline-flex min-h-11 w-fit items-center gap-3 rounded-full bg-gray-950 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-[#2563EB] focus-visible:bg-[#2563EB] dark:bg-[#38BDF8] dark:text-[#081a2f] dark:hover:bg-[#0EA5E9]"
                                >
                                    View Project
                                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default Projects;
