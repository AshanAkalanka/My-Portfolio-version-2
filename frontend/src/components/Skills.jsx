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
            className="py-24 bg-gradient-to-r from-blue-100 via-white to-amber-100 dark:from-[#0a192f] dark:to-[#061224] transition-colors duration-300 relative overflow-hidden min-h-[70vh] flex items-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
        >
            {/* Subtle Background Glows */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#64ffda]/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 relative z-10 w-full">
                {/* Header */}
                <motion.div
                    className="text-center md:text-left mb-12"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white transition-colors duration-300 mb-3">
                        My <span className="text-blue-600 dark:text-[#64ffda]">Skills</span>
                    </h2>
                    <p className="text-[15px] text-gray-700 dark:text-gray-300 max-w-2xl transition-colors duration-300">
                        Here are a few technologies I've been working with recently:
                    </p>
                </motion.div>

                <div className="flex flex-col md:flex-row gap-12 items-start justify-between">
                    {/* Filters (Sidebar on desktop, Row on mobile) */}
                    <motion.div
                        className="flex flex-wrap md:flex-col w-full md:w-1/3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {filters.map((filter) => {
                            const isActive = activeFilter === filter;
                            return (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`relative flex items-center py-3 pr-5 pl-2 text-base font-normal tracking-wide uppercase transition-all duration-300 text-left border-r-2 ${isActive
                                        ? "text-blue-600 dark:text-[#64ffda] border-blue-600 dark:border-[#64ffda]"
                                        : "text-gray-400 dark:text-slate-500 border-gray-200 dark:border-slate-700 hover:text-gray-700 dark:hover:text-slate-300"
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
                        className="w-full md:w-2/3"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                            <AnimatePresence mode="popLayout">
                                {activeSkills.map((skill, index) => (
                                    <motion.div
                                        layout
                                        key={skill.name}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        transition={{ duration: 0.2, delay: index * 0.03 }}
                                        className="flex items-center gap-4 group cursor-default"
                                    >
                                        <svg className="w-3.5 h-3.5 text-blue-500 dark:text-[#64ffda] transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <polygon points="5 3 19 12 5 21"></polygon>
                                        </svg>
                                        <span className="text-[18px] font-medium text-gray-700 dark:text-slate-300 transition-colors group-hover:text-blue-600 dark:group-hover:text-[#64ffda]">
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