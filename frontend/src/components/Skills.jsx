import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPython, FaReact, FaJava, FaNodeJs, FaDocker, FaFigma, FaJira, FaGithub } from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiExpress, SiMongodb, SiPostgresql, SiMysql, SiJavascript, SiCanva, SiTensorflow } from "react-icons/si";
import { TbApi } from "react-icons/tb";

const skillIcons = {
    "Python": { icon: FaPython, color: "text-[#3776AB]" },
    "Typescript": { icon: SiTypescript, color: "text-[#3178C6]" },
    "React.js": { icon: FaReact, color: "text-[#61DAFB]" },
    "Java": { icon: FaJava, color: "text-[#007396]" },
    "Node.js": { icon: FaNodeJs, color: "text-[#339933]" },
    "TensorFlow": { icon: SiTensorflow, color: "text-[#FF6F00]" },
    "Next.js": { icon: SiNextdotjs, color: "text-gray-900 dark:text-[#d7def7]" },
    "Express.js": { icon: SiExpress, color: "text-gray-900 dark:text-[#d7def7]" },
    "MongoDB": { icon: SiMongodb, color: "text-[#47A248]" },
    "PostgreSQL": { icon: SiPostgresql, color: "text-[#336791]" },
    "MySQL": { icon: SiMysql, color: "text-[#4479A1]" },
    "JavaScript": { icon: SiJavascript, color: "text-[#F7DF1E]" },
    "Git & GitHub": { icon: FaGithub, color: "text-gray-900 dark:text-[#d7def7]" },
    "Docker": { icon: FaDocker, color: "text-[#2496ED]" },
    "REST APIs": { icon: TbApi, color: "text-gray-600 dark:text-[#a8b3d1]" },
    "Figma": { icon: FaFigma, color: "text-[#F24E1E]" },
    "Canva": { icon: SiCanva, color: "text-[#00C4CC]" },
    "Jira": { icon: FaJira, color: "text-[#0052CC]" },
};

function Skills() {
    const filters = ["All Skills", "Development", "Design Tools", "Other Tools"];

    const skillsData = {
        "Main Skills": [
            { name: "Python" },
            { name: "Typescript" },
            { name: "React.js" },
            { name: "Java" },
            { name: "Node.js" },
            { name: "TensorFlow" },
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
            className="theme-section section-dark-skills dark-accent-bg py-14 md:py-20 bg-[#081a2f] transition-colors duration-300 relative overflow-hidden"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
        >
            {/* Subtle Background Glows */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-72 h-72 bg-slate-300/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-5xl mx-auto px-6 relative z-10 w-full">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-widest text-gray-900 dark:text-[#d7def7] transition-colors duration-300 mb-3">
                        My <span className="text-[#2563EB] dark:text-[#38BDF8]">Skills</span>
                    </h2>
                    <p className="theme-text-muted text-[15px] text-gray-600 dark:text-[#a8b3d1] max-w-2xl mx-auto transition-colors duration-300">
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
                                        ? "text-[#2563EB] bg-[#2563EB]/10 border-[#2563EB]/30 shadow-sm dark:text-[#38BDF8] dark:bg-[#38BDF8]/15 dark:border-[#38BDF8]/40"
                                        : "text-gray-600 bg-white/60 border-gray-200 hover:text-gray-900 hover:bg-white dark:text-[#a8b3d1] dark:bg-white/5 dark:border-white/10 dark:hover:text-[#d7def7] dark:hover:bg-white/10"
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
                        className="w-full mt-12"
                    >
                        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:flex md:flex-wrap md:justify-center md:gap-8 max-w-4xl mx-auto">
                            <AnimatePresence mode="popLayout">
                                {activeSkills.map((skill, index) => {
                                    const skillData = skillIcons[skill.name] || { icon: FaReact, color: "text-[#a8b3d1]" };
                                    const IconComponent = skillData.icon;
                                    const isHighlighted = index % 2 === 0;

                                    return (
                                        <motion.div
                                            layout
                                            key={skill.name}
                                            initial={{ opacity: 0, y: 18, scale: 0.97 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 18, scale: 0.97 }}
                                            transition={{ duration: 0.3, delay: index * 0.03 }}
                                            className={`skill-chip flex min-w-0 items-center justify-center gap-2 rounded-lg px-3 py-4 transition-all duration-300 md:min-w-[150px] md:gap-3 md:px-6 group ${
                                                isHighlighted 
                                                    ? "bg-white/70 dark:bg-slate-900/40 hover:scale-105" 
                                                    : "bg-transparent hover:scale-105"
                                            }`}
                                        >
                                            <IconComponent className={`text-xl md:text-2xl ${skillData.color} shrink-0`} />
                                            <span className={`truncate text-[13px] font-bold md:text-[15px] ${isHighlighted ? "text-gray-900 dark:text-[#d7def7]" : "text-gray-600 dark:text-[#a8b3d1]"} transition-colors`}>
                                                {skill.name}
                                            </span>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}

export default Skills;
