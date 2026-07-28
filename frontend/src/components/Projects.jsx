import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import {
    ArrowRight,
    ArrowUpRight,
    BookOpen,
    CalendarDays,
    CloudSun,
    Code2,
    Plane,
    ShoppingBasket,
    Sparkles,
    WalletCards,
} from "lucide-react";
import ProgressiveImage from "./ProgressiveImage";
import projects from "../data/projects";

const projectThemes = [
    {
        Icon: BookOpen,
        accent: "text-violet-600 dark:text-violet-300",
        icon: "bg-violet-100 text-violet-600 dark:bg-violet-400/15 dark:text-violet-300",
        tag: "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-200",
        action: "bg-violet-50 text-violet-600 dark:bg-violet-400/10 dark:text-violet-300",
    },
    {
        Icon: Plane,
        accent: "text-blue-600 dark:text-blue-300",
        icon: "bg-blue-100 text-blue-600 dark:bg-blue-400/15 dark:text-blue-300",
        tag: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-200",
        action: "bg-blue-50 text-blue-600 dark:bg-blue-400/10 dark:text-blue-300",
    },
    {
        Icon: ShoppingBasket,
        accent: "text-green-600 dark:text-green-300",
        icon: "bg-green-100 text-green-600 dark:bg-green-400/15 dark:text-green-300",
        tag: "border-green-200 bg-green-50 text-green-700 dark:border-green-400/20 dark:bg-green-400/10 dark:text-green-200",
        action: "bg-green-50 text-green-600 dark:bg-green-400/10 dark:text-green-300",
    },
    {
        Icon: WalletCards,
        accent: "text-amber-600 dark:text-amber-300",
        icon: "bg-amber-100 text-amber-600 dark:bg-amber-400/15 dark:text-amber-300",
        tag: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-200",
        action: "bg-amber-50 text-amber-600 dark:bg-amber-400/10 dark:text-amber-300",
    },
    {
        Icon: Code2,
        accent: "text-indigo-600 dark:text-indigo-300",
        icon: "bg-indigo-100 text-indigo-600 dark:bg-indigo-400/15 dark:text-indigo-300",
        tag: "border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-400/20 dark:bg-indigo-400/10 dark:text-indigo-200",
        action: "bg-indigo-50 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-300",
    },
    {
        Icon: CalendarDays,
        accent: "text-fuchsia-600 dark:text-fuchsia-300",
        icon: "bg-fuchsia-100 text-fuchsia-600 dark:bg-fuchsia-400/15 dark:text-fuchsia-300",
        tag: "border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700 dark:border-fuchsia-400/20 dark:bg-fuchsia-400/10 dark:text-fuchsia-200",
        action: "bg-fuchsia-50 text-fuchsia-600 dark:bg-fuchsia-400/10 dark:text-fuchsia-300",
    },
    {
        Icon: CloudSun,
        accent: "text-cyan-600 dark:text-cyan-300",
        icon: "bg-cyan-100 text-cyan-600 dark:bg-cyan-400/15 dark:text-cyan-300",
        tag: "border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-200",
        action: "bg-cyan-50 text-cyan-600 dark:bg-cyan-400/10 dark:text-cyan-300",
    },
];

function Projects() {
    return (
        <section
            id="projects"
            className="theme-section section-dark-projects scroll-mt-24 relative overflow-hidden bg-[#f8fafc] py-16 transition-colors duration-300 md:py-20"
        >
            <div className="relative z-10 mx-auto w-full max-w-[1280px] px-4 md:px-8">
                <div className="mb-7 flex justify-center md:absolute md:right-8 md:top-0 md:mb-0">
                    <a
                        href="https://github.com/AshanAkalanka"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-black hover:shadow-lg active:scale-[0.98] dark:bg-[#38BDF8] dark:text-[#081a2f] dark:hover:bg-[#0EA5E9]"
                    >
                        <FaGithub className="text-base transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                        View on GitHub
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                    </a>
                </div>

                {/* Header */}
                <div className="mx-auto mb-11 max-w-3xl text-center md:mb-14">
                    <p className="mb-3 inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.15em] text-violet-600 dark:text-violet-300">
                        <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                        My work
                    </p>
                    <div>
                        <h2 className="section-heading mx-auto text-gray-950 transition-colors duration-300 dark:text-[#d7def7]">
                            Featured Projects
                        </h2>
                        <p className="section-description mx-auto mt-4 text-gray-600 transition-colors duration-300 dark:text-gray-400">
                            A selection of recent work that showcases problem-solving, design, and impact.
                        </p>
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project, index) => {
                        const theme = projectThemes[index % projectThemes.length];
                        const ProjectIcon = theme.Icon;

                        return (
                            <motion.a
                                key={project.slug}
                                href={project.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`View ${project.title} project on GitHub`}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.07 }}
                                className="project-card group mx-auto flex h-full w-full max-w-sm flex-col overflow-hidden rounded-[1.25rem] border border-slate-200/80 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.07)] transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-[0_20px_50px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-white/[0.055] dark:hover:border-[#38BDF8]/35 md:max-w-none"
                            >
                                <div className="relative aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-slate-900">
                                    <ProgressiveImage
                                        src={project.image}
                                        alt={`${project.title} website preview`}
                                        wrapperClassName="h-full w-full"
                                        className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.035]"
                                    />
                                    <div className="absolute inset-0 bg-blue-600/0 transition-colors duration-300 group-hover:bg-blue-600/[0.06] dark:group-hover:bg-[#38BDF8]/[0.06]" />
                                </div>

                                <div className="flex flex-grow flex-col p-5">
                                    <div className="flex items-center gap-3">
                                        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${theme.icon}`}>
                                            <ProjectIcon className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                        <div className="min-w-0">
                                            <p className={`text-[10px] font-extrabold uppercase tracking-[0.13em] ${theme.accent}`}>
                                                {project.category}
                                            </p>
                                            <h3 className="mt-0.5 text-xl font-extrabold leading-tight tracking-[-0.025em] text-slate-950 transition-colors duration-300 dark:text-white">
                                                {project.title}
                                            </h3>
                                        </div>
                                    </div>

                                    <p className="mt-4 min-h-12 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                                        {project.description}
                                    </p>

                                    <div className="mb-4 mt-3 flex min-h-8 flex-wrap content-start gap-2">
                                        {project.tech.slice(0, 4).map((technology) => (
                                            <span
                                                key={technology}
                                                className="rounded-full border border-[#1e3a8a]/20 bg-[#1e3a8a]/5 px-3 py-1 text-[11px] font-bold text-[#1e3a8a] dark:border-[#38BDF8]/25 dark:bg-[#38BDF8]/10 dark:text-[#7DD3FC]"
                                            >
                                                {technology}
                                            </span>
                                        ))}
                                        {project.tech.length > 4 && (
                                            <span className="rounded-full border border-[#1e3a8a]/20 bg-[#1e3a8a]/5 px-3 py-1 text-[11px] font-bold text-[#1e3a8a] dark:border-[#38BDF8]/25 dark:bg-[#38BDF8]/10 dark:text-[#7DD3FC]">
                                                +{project.tech.length - 4}
                                            </span>
                                        )}
                                    </div>

                                    <div className="mt-auto flex items-center justify-center gap-3 border-t border-slate-200 pt-4 text-sm font-extrabold text-[#1e3a8a] transition-colors group-hover:text-[#172554] dark:border-white/10 dark:text-[#38BDF8] dark:group-hover:text-[#7DD3FC]">
                                        View project
                                        <span className="flex items-center justify-center text-[#1e3a8a] transition-transform duration-300 group-hover:translate-x-1 dark:text-[#38BDF8]">
                                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                        </span>
                                    </div>
                                </div>
                            </motion.a>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}

export default Projects;
