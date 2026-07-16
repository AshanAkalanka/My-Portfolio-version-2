import { motion } from "framer-motion";


const educationData = [
    {
        id: 1,
        title: "BSc (Hons) in Artificial Intelligence",
        institution: "SLIIT",
        period: "2024 - Present",
        detail: "Machine learning, deep learning, software engineering, and modern web technologies.",
    },
    {
        id: 2,
        title: "Advanced Level Commerce Stream",
        institution: "Eheliyagoda Central College",
        period: "2019 - 2022",
        detail: "Accounting, Business Studies, and Information Technology.",
    },
    {
        id: 3,
        title: "Certifications",
        institution: "Online Platforms",
        period: "2022 - Present",
        detail: "Prompt engineering, artificial intelligence, web development, and programming languages.",
    },
];

function Education() {
    return (
        <motion.section
            id="education"
            className="theme-section section-dark-education scroll-mt-24 bg-white px-6 py-16 text-[#001f4d] transition-colors duration-300 dark:text-[#f2f4f7] md:py-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.65, ease: "easeOut" }}
        >
            <div className="mx-auto w-full max-w-6xl">
                <div className="relative mb-10 md:mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="section-heading text-gray-900 dark:text-[#d7def7] transition-colors duration-300"
                    >
                        Education
                    </motion.h2>
                </div>

                <div className="border-t border-[#b8c4d3] dark:border-white/10">
                    {educationData.map((item, index) => (
                        <motion.article
                            key={item.id}
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
                            className="-mx-3 grid gap-5 border-b border-[#b8c4d3] px-3 py-8 transition-colors duration-300 hover:bg-[#2563EB]/[0.035] dark:border-white/10 dark:hover:bg-white/[0.025] md:grid-cols-[0.9fr_1.7fr_1.2fr] md:items-center md:gap-8 md:py-10"
                        >
                            <div className="text-sm font-bold uppercase tracking-wider text-[#71819a] dark:text-[#9ca3af] md:text-base">
                                {item.period}
                            </div>

                            <div>
                                <h3 className="max-w-xl text-lg font-bold leading-snug text-gray-900 dark:text-white md:text-xl">
                                    {item.title}
                                </h3>
                                <p className="mt-2 text-sm font-medium text-[#536985] dark-accent-text">
                                    {item.institution}
                                </p>
                            </div>

                            <p className="body-copy w-full max-w-md text-left font-medium text-[#536985] dark:text-[#b7bdc6] md:max-w-[20rem] md:justify-self-end">
                                {item.detail}
                            </p>
                        </motion.article>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}

export default Education;
