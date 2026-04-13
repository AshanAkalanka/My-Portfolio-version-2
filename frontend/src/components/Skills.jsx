import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
function Skills() {
    const filters = ["All Skills", "Development", "Design Tools", "Other Tools"];

    const skillsData = {
        "Main Skills": [
            { name: "Python" },
            { name: "Typescript" },
            { name: "React.js" },
            { name: "Java" },
            { name: "Node.js" },
            { name: "C#" },
            { name: "Next.js" },
            { name: "Express.js" },
            { name: "MongoDB" },
            { name: "PostgreSQL" },
            { name: "MySQL" },
            { name: "JavaScript" },
            { name: "Git & GitHub" },
            { name: "Docker" },
            { name: "REST APIs" },
            { name: "Figma" },
            { name: "Canva" },
            { name: "Jira" },
        ],
        Development: [
            { name: "React.js" },
            { name: "Next.js" },
            { name: "Node.js" },
            { name: "Express.js" },
            { name: "MongoDB" },
            { name: "PostgreSQL" },
            { name: "MySQL" },
            { name: "JavaScript" },
            { name: "Git & GitHub" },
            { name: "Docker" },
        ],
        "Design Tools": [
            { name: "Figma" },
            { name: "Canva" },
        ],
        "Other Tools": [
            { name: "Jira" },
        ],
    };

    const [activeFilter, setActiveFilter] = useState("All Skills");

    const activeSkills =
        activeFilter === "All Skills"
            ? skillsData["Main Skills"]
            : skillsData[activeFilter] || [];

    return (
        <motion.section
            id="skills"
            className="theme-section py-16 md:py-20 bg-white transition-colors duration-300 relative overflow-hidden"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
        >
            {/* Subtle Background Glows */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#5AA9FF]/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-5xl mx-auto px-6 relative z-10 w-full">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white transition-colors duration-300 mb-3">
                        My <span className="text-blue-600 dark:text-[#5AA9FF]">Skills</span>
                    </h2>
                    <p className="theme-text-muted text-[15px] text-gray-700 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
                        Here are a few technologies I've been working with recently:
                    </p>
                </motion.div>

                <div className="w-full">
                    <motion.div
                        className="flex flex-wrap justify-center w-full gap-3 pb-2"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {filters.map((filter) => {
                            const isActive = activeFilter === filter;
                            return (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`whitespace-nowrap px-4 md:px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wide uppercase border transition-all duration-300 ${isActive
                                        ? "text-blue-700 dark:text-[#5AA9FF] bg-blue-50 dark:bg-[#5AA9FF]/10 border-blue-200 dark:border-[#5AA9FF]/30 shadow-sm"
                                        : "text-gray-500 dark:text-slate-400 bg-white/70 dark:bg-slate-900/50 border-gray-200 dark:border-slate-700 hover:text-gray-700 dark:hover:text-slate-200"
                                        }`}
                                >
                                    {filter}
                                </button>
                            );
                        })}
                    </motion.div>

                    {/* Skills List Grid */}
                    <motion.div
                        layout
                        className="w-full mt-8"
                    >
                        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                            <AnimatePresence mode="popLayout">
                                {activeSkills.map((skill, index) => (
                                    <motion.div
                                        layout
                                        key={skill.name}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 8 }}
                                        transition={{ duration: 0.25, delay: index * 0.02 }}
                                        className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/55 backdrop-blur-md shadow-[0_4px_20px_rgba(15,23,42,0.06)] dark:shadow-[0_6px_18px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 transition-all duration-300 group cursor-default"
                                    >
                                        <svg className="w-3.5 h-3.5 text-blue-500 dark:text-[#5AA9FF] transition-transform duration-300 group-hover:translate-x-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <polygon points="5 3 19 12 5 21"></polygon>
                                        </svg>
                                        <span className="text-[13px] md:text-[15px] font-semibold text-gray-700 dark:text-slate-300 transition-colors group-hover:text-blue-600 dark:group-hover:text-[#5AA9FF]">
                                            {skill.name}
                                        </span>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}

export default Skills;
