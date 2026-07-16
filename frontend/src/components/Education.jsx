import { motion } from "framer-motion";

const educationData = [
    {
        id: 1,
        code: "2024—Present",
        title: "BSc (Hons) in IT Specialising in Artificial Intelligence",
        institution: "SLIIT",
        detail: "Machine learning, deep learning, software engineering, and modern web technologies.",
        rotate: -1,
    },
    {
        id: 2,
        code: "2019—2022",
        title: "Advanced Level (Commerce Stream)",
        institution: "Eheliyagoda Central College",
        detail: "Accounting, Business Studies, and Information Technology.",
        rotate: 1,
    },
    {
        id: 3,
        code: "2022—Present",
        title: "Certifications",
        institution: "Online Platforms",
        detail: "Prompt engineering, artificial intelligence, web development, and programming languages.",
        rotate: -0.75,
    },
];

function Education() {
    return (
        <motion.section
            id="education"
            className="theme-section section-dark-education scroll-mt-24 bg-white px-6 py-16 text-[#001f4d] transition-colors duration-300 dark:text-[#f2f4f7] md:py-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.65, ease: "easeOut" }}
        >
            <div className="mx-auto w-full max-w-6xl">
                <div className="relative mb-10 text-center md:mb-14">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.3em] text-[#71819a] dark:text-[#9ca3af]"
                    >
                        Academic Record
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.05 }}
                        className="section-heading text-gray-900 dark:text-[#d7def7] transition-colors duration-300"
                    >
                        Education
                    </motion.h2>
                </div>

                <div className="grid gap-x-8 gap-y-10 pt-4 md:grid-cols-3 md:gap-y-6">
                    {educationData.map((item, index) => (
                        <motion.article
                            key={item.id}
                            initial={{ opacity: 0, y: 24, rotate: 0 }}
                            whileInView={{ opacity: 1, y: 0, rotate: item.rotate }}
                            whileHover={{ rotate: 0, y: -10, scale: 1.03 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                            className="group relative"
                        >
                            {/* tab */}
                            <div className="absolute -top-4 left-6 z-10 rounded-t-md bg-[#001f4d] px-3 py-1.5 shadow-sm transition-colors duration-300 dark:bg-[#38BDF8]">
                                <span className="text-[11px] font-semibold tabular-nums tracking-wide text-white dark:text-[#081a2f]">
                                    {item.code}
                                </span>
                            </div>

                            {/* card */}
                            <div
                                className="relative overflow-hidden rounded-md border border-[#b8c4d3] bg-[#fbfbf9] px-6 pb-6 pt-7 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-shadow duration-300 group-hover:shadow-[0_18px_30px_-12px_rgba(0,31,77,0.25)] dark:border-white/10 dark:bg-white/[0.03]"
                                style={{ minHeight: "195px" }}
                            >
                                {/* folded corner */}
                                <div
                                    className="pointer-events-none absolute bottom-0 right-0 h-8 w-8 bg-[#b8c4d3]/40 transition-colors duration-300 dark:bg-white/10"
                                    style={{ clipPath: "polygon(100% 0, 0 100%, 100% 100%)" }}
                                />

                                {/* perforation */}
                                <div className="mb-4 border-t border-dashed border-[#b8c4d3] dark:border-white/15" />

                                <h3 className="text-lg font-bold leading-snug text-gray-900 dark:text-white md:text-xl">
                                    {item.title}
                                </h3>
                                <p className="mt-1.5 text-sm font-semibold text-[#2563EB] dark:text-[#38BDF8]">
                                    {item.institution}
                                </p>
                                <p className="body-copy mt-3 text-sm font-medium leading-relaxed text-[#536985] dark:text-[#b7bdc6]">
                                    {item.detail}
                                </p>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}

export default Education;
