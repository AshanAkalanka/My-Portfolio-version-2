import { motion } from "framer-motion";
import { FaPython, FaReact, FaJava, FaNodeJs, FaDocker, FaFigma, FaJira, FaGithub } from "react-icons/fa";
import {
    SiAndroidstudio,
    SiCanva,
    SiCss3,
    SiExpress,
    SiFramer,
    SiHtml5,
    SiHuggingface,
    SiJavascript,
    SiJupyter,
    SiMongodb,
    SiMysql,
    SiNextdotjs,
    SiPostgresql,
    SiR,
    SiScikitlearn,
    SiSqlite,
    SiSpringboot,
    SiTailwindcss,
    SiTensorflow,
    SiTypescript,
    SiVite,
} from "react-icons/si";
import { TbApi, TbPlugConnected, TbSql } from "react-icons/tb";

const skillIcons = {
    "Python": { icon: FaPython, color: "text-[#3776AB]" },
    "SQL": { icon: TbSql, color: "text-[#4479A1]" },
    "R": { icon: SiR, color: "text-[#276DC3]" },
    "Typescript": { icon: SiTypescript, color: "text-[#3178C6]" },
    "React.js": { icon: FaReact, color: "text-[#61DAFB]" },
    "HTML": { icon: SiHtml5, color: "text-[#E34F26]" },
    "CSS": { icon: SiCss3, color: "text-[#1572B6]" },
    "Tailwind CSS": { icon: SiTailwindcss, color: "text-[#06B6D4]" },
    "Framer Motion": { icon: SiFramer, color: "text-[#0055FF]" },
    "Vite": { icon: SiVite, color: "text-[#646CFF]" },
    "Java": { icon: FaJava, color: "text-[#007396]" },
    "Node.js": { icon: FaNodeJs, color: "text-[#339933]" },
    "Spring Boot": { icon: SiSpringboot, color: "text-[#6DB33F]" },
    "WebSockets": { icon: TbPlugConnected, color: "text-[#8B5CF6]" },
    "TensorFlow": { icon: SiTensorflow, color: "text-[#FF6F00]" },
    "Hugging Face": { icon: SiHuggingface, color: "text-[#FFD21E]" },
    "Jupyter Notebook": { icon: SiJupyter, color: "text-[#F37626]" },
    "Scikit-learn": { icon: SiScikitlearn, color: "text-[#F7931E]" },
    "Next.js": { icon: SiNextdotjs, color: "text-gray-900 dark:text-[#d7def7]" },
    "Express.js": { icon: SiExpress, color: "text-gray-900 dark:text-[#d7def7]" },
    "MongoDB": { icon: SiMongodb, color: "text-[#47A248]" },
    "PostgreSQL": { icon: SiPostgresql, color: "text-[#336791]" },
    "MySQL": { icon: SiMysql, color: "text-[#4479A1]" },
    "SQLite": { icon: SiSqlite, color: "text-[#003B57]" },
    "JavaScript": { icon: SiJavascript, color: "text-[#F7DF1E]" },
    "Git & GitHub": { icon: FaGithub, color: "text-gray-900 dark:text-[#d7def7]" },
    "Docker": { icon: FaDocker, color: "text-[#2496ED]" },
    "REST APIs": { icon: TbApi, color: "text-gray-600 dark:text-[#a8b3d1]" },
    "Figma": { icon: FaFigma, color: "text-[#F24E1E]" },
    "Canva": { icon: SiCanva, color: "text-[#00C4CC]" },
    "Jira": { icon: FaJira, color: "text-[#0052CC]" },
    "Android Studio": { icon: SiAndroidstudio, color: "text-[#3DDC84]" },
};

const skillGroups = [
    {
        title: "Languages",
        description: "Core programming languages",
        skills: ["Python", "Typescript", "Java", "JavaScript", "SQL", "R"],
    },
    {
        title: "Frontend",
        description: "Interfaces and web experiences",
        skills: [
            "React.js",
            "Next.js",
            "HTML",
            "CSS",
            "Tailwind CSS",
            "Framer Motion",
            "Vite",
        ],
    },
    {
        title: "Backend",
        description: "APIs and server-side systems",
        skills: ["Node.js", "Express.js", "REST APIs", "Spring Boot", "WebSockets"],
    },
    {
        title: "Databases",
        description: "Relational and document data",
        skills: ["MongoDB", "PostgreSQL", "MySQL", "SQLite"],
    },
    {
        title: "AI & Machine Learning",
        description: "Intelligent applications and models",
        skills: [
            "Python",
            "TensorFlow",
            "Hugging Face",
            "Jupyter Notebook",
            "Scikit-learn",
        ],
    },
    {
        title: "Tools & Design",
        description: "Workflow, delivery, and design",
        skills: ["Git & GitHub", "Docker", "Figma", "Canva", "Jira", "Android Studio"],
    },
];

function Skills() {
    return (
        <motion.section
            id="skills"
            className="theme-section section-dark-skills dark-accent-bg scroll-mt-24 py-14 md:py-20 bg-[#081a2f] transition-colors duration-300 relative overflow-hidden"
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
                    <h2 className="section-heading text-gray-900 dark:text-[#d7def7] transition-colors duration-300 mb-3">
                        My <span className="text-[#2563EB] dark:text-[#38BDF8]">Skills</span>
                    </h2>
                    <p className="section-description theme-text-muted text-gray-600 dark:text-[#a8b3d1] mx-auto transition-colors duration-300">
                        Technologies grouped by how I use them across software, web, and AI projects.
                    </p>
                </motion.div>

                <div className="grid gap-5 md:grid-cols-2">
                    {skillGroups.map((group, groupIndex) => (
                        <motion.article
                            key={group.title}
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: groupIndex * 0.06 }}
                            className="theme-panel rounded-xl border border-gray-200/80 bg-white/55 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#2563EB]/25 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-[#38BDF8]/30 md:p-6"
                        >
                            <div className="mb-5 flex items-start gap-3">
                                <span className="text-base font-bold leading-6 tabular-nums text-[#2563EB] dark:text-[#38BDF8]">
                                    {String(groupIndex + 1).padStart(2, "0")}
                                </span>
                                <div>
                                    <h3 className="text-base font-bold leading-6 text-gray-900 dark:text-[#d7def7]">
                                        {group.title}
                                    </h3>
                                    <p className="mt-1 text-xs leading-relaxed text-gray-500 dark:text-[#7f8aaa]">
                                        {group.description}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2.5">
                                {group.skills.map((skillName) => {
                                    const skillData = skillIcons[skillName] || {
                                        icon: FaReact,
                                        color: "text-[#a8b3d1]",
                                    };
                                    const IconComponent = skillData.icon;

                                    return (
                                        <div
                                            key={skillName}
                                            className="skill-chip group flex items-center gap-2 rounded-lg border border-gray-200 bg-white/70 px-3 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#2563EB]/30 hover:shadow-sm dark:border-white/10 dark:bg-white/5 dark:hover:border-[#38BDF8]/30"
                                        >
                                            <IconComponent
                                                className={`shrink-0 text-lg ${skillData.color} transition-transform duration-300 group-hover:scale-110`}
                                                aria-hidden="true"
                                            />
                                            <span className="text-xs font-semibold text-gray-700 dark:text-[#a8b3d1]">
                                                {skillName}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}

export default Skills;
