import { motion } from "framer-motion";


const educationData = [
    {
        id: 1,
        title: "HIGHER EDUCATION",
        institution: "BSc (Hons) in Artificial Intelligence - SLIIT",
        period: "2024 - Present",
        description:
            "Focused on machine learning, deep learning, software engineering, and modern web technologies.",
    },
    {
        id: 2,
        title: "COLLEGE",
        institution: "Advanced Level Commerce Stream - Eheliyagoda Central College",
        period: "2019 - 2022",
        description:
            "Studied Accounting, Business Studies, and Information Technology to build a strong IT and business foundation.",
    },
    {
        id: 3,
        title: "CERTIFICATIONS",
        institution: "Online Platforms",
        period: "2022 - Present",
        description:
            "Completed certifications in prompt engineering, artificial intelligence, web development, and programming languages.",
    },
];

function Education() {
    return (
        <motion.section
            id="education"
            className="theme-section scroll-mt-24 bg-white text-gray-900 dark:text-[#ecebd7] py-16 md:py-20 px-6 transition-colors duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.65, ease: "easeOut" }}
        >
            <div className="max-w-6xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-stretch">
                    <div className="relative pl-14 md:pl-16 order-2 lg:order-1">
                        <div className="absolute left-6 md:left-7 top-2 bottom-2 w-px bg-gray-300 dark:bg-[#d7d4c4] transition-colors duration-300" />

                        <div className="space-y-9 md:space-y-12">
                            {educationData.map((item) => (
                                <motion.article
                                    key={item.id}
                                    initial={{ opacity: 0, x: -24 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.45, ease: "easeOut" }}
                                    className="relative"
                                >
                                    <span className="absolute -left-[2.375rem] md:-left-[2.625rem] top-1.5 h-3 w-3 rounded-full bg-primary dark:bg-[#d7d4c4] transition-colors duration-300" />
                                    <h3 className="text-base md:text-xl font-bold tracking-wide">
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 text-xs md:text-[13px] uppercase tracking-[0.12em] text-gray-500 dark:text-[#c7c4b3] transition-colors duration-300">
                                        {item.period}
                                    </p>
                                    <p className="mt-3 text-xs md:text-sm leading-relaxed text-gray-700 dark:text-[#dfddcf] max-w-md transition-colors duration-300">
                                        {item.institution}
                                    </p>
                                    <p className="mt-2 text-xs md:text-sm leading-relaxed text-gray-700 dark:text-[#dfddcf] max-w-md transition-colors duration-300">
                                        {item.description}
                                    </p>
                                </motion.article>
                            ))}
                        </div>
                    </div>

                    <div className="relative flex items-center overflow-hidden order-1 lg:order-2">
                        <motion.h2
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="font-extrabold uppercase leading-none tracking-tight w-full"
                            style={{ fontSize: "clamp(3rem, 5.5vw, 6rem)" }}
                        >
                            <span
                                className="normal-case block"
                                style={{ fontFamily: "cursive", fontWeight: 600, fontSize: "0.75em" }}
                            >
                                my
                            </span>
                            education
                        </motion.h2>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}

export default Education;
