import { motion } from "framer-motion";

const educationData = [
    {
        id: 1,
        code: "2019—2022",
        title: "Advanced Level (Commerce Stream)",
        institution: "Eheliyagoda Central College",
        detail: "Accounting, Business Studies, Information Technology, and practical commerce fundamentals.",
        ongoing: false,
        featured: false,
    },
    {
        id: 2,
        code: "2022—Present",
        title: "Certifications",
        institution: "Online Platforms",
        detail: "Prompt engineering, artificial intelligence, web development, and programming languages.",
        ongoing: true,
        featured: false,
    },
    {
        id: 3,
        code: "2024—Present",
        title: "BSc (Hons) in IT Specialising in Artificial Intelligence",
        institution: "SLIIT",
        detail: "Machine learning, deep learning, software engineering, and modern web technologies.",
        ongoing: true,
        featured: true,
    },
];

const periodLabels = {
    1: "2019—2022",
    2: "2022—Present",
    3: "2024—Present",
};

const timelinePulseTimes = {
    1: [0, 0.001, 0.002, 0.11, 1],
    2: [0, 0.339, 0.34, 0.45, 1],
    3: [0, 0.689, 0.69, 0.8, 1],
};

const timelineDuration = 5.25;
const timelineRepeatDelay = 0.4;

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
            <div className="mx-auto w-full max-w-5xl">
                <div className="relative mb-10 text-center md:mb-12">
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

                <div className="relative">
                    <div className="absolute bottom-4 left-[15px] top-4 w-px bg-[#b8c4d3] dark:bg-white/15 md:hidden" />

                    {/* connecting line, desktop only */}
                    <div className="absolute left-0 right-0 top-[15px] hidden h-px bg-[#b8c4d3] dark:bg-white/15 md:block" />
                    <motion.span
                        aria-hidden="true"
                        className="absolute top-[12px] hidden h-1.5 w-1.5 rounded-full bg-[#2563EB] shadow-[0_0_9px_rgba(37,99,235,0.7)] motion-reduce:md:hidden md:block"
                        animate={{
                            left: [
                                "calc(0% + 13px)",
                                "calc(33.333% + 23.667px)",
                                "calc(66.667% + 34.333px)",
                                "calc(100% + -6px)",
                            ],
                        }}
                        transition={{
                            duration: timelineDuration,
                            times: [0, 0.34, 0.69, 1],
                            ease: "linear",
                            repeat: Infinity,
                            repeatDelay: timelineRepeatDelay,
                        }}
                    />

                    <div className="grid gap-y-10 md:grid-cols-3 md:gap-x-8 md:gap-y-0">
                        {educationData.map((item, index) => (
                            <motion.article
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
                                className="group relative flex items-start pl-11 text-left md:flex-col md:items-start md:pl-0"
                            >
                                {/* node */}
                                <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center md:relative md:mb-6">
                                    <motion.span
                                        aria-hidden="true"
                                        className="absolute hidden h-8 w-8 rounded-full bg-[#2563EB]/20 shadow-[0_0_14px_rgba(37,99,235,0.18)] motion-reduce:md:hidden dark:bg-[#38BDF8]/20 md:block"
                                        animate={{
                                            opacity: [0, 0, 0.45, 0, 0],
                                            scale: [0.65, 0.65, 1, 1.5, 0.65],
                                        }}
                                        transition={{
                                            duration: timelineDuration,
                                            times: timelinePulseTimes[item.id],
                                            ease: "easeOut",
                                            repeat: Infinity,
                                            repeatDelay: timelineRepeatDelay,
                                        }}
                                    />
                                    <span
                                        className={`relative rounded-full border-2 transition-transform duration-300 group-hover:scale-110 ${
                                            item.ongoing
                                                ? "h-3 w-3 border-[#2563EB] bg-white dark:border-[#38BDF8] dark:bg-[#081a2f]"
                                                : "h-3 w-3 border-[#b8c4d3] bg-[#b8c4d3] dark:border-white/30 dark:bg-white/30"
                                        }`}
                                    />
                                </div>

                                <div className="w-full">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-[11px] font-semibold tabular-nums text-[#2563EB] dark:text-[#38BDF8]">
                                            {periodLabels[item.id]}
                                        </span>
                                        {item.featured && (
                                            <span className="rounded-full bg-[#2563EB] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-white dark:bg-[#38BDF8] dark:text-[#081a2f]">
                                                Degree
                                            </span>
                                        )}
                                    </div>

                                    <h3
                                        className={`mt-2 text-lg font-bold leading-snug md:text-xl ${
                                            item.featured
                                                ? "text-[#1D4ED8] dark:text-[#7DD3FC]"
                                                : "text-gray-900 dark:text-white"
                                        }`}
                                    >
                                        {item.title}
                                    </h3>
                                    <p className="mt-1.5 text-sm font-semibold text-[#71819a] dark:text-[#9ca3af]">
                                        {item.institution}
                                    </p>
                                    <p className="body-copy mt-3 max-w-xs text-sm font-medium leading-relaxed text-[#536985] dark:text-[#b7bdc6] md:min-h-[4.75rem]">
                                        {item.detail}
                                    </p>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </div>
        </motion.section>
    );
}

export default Education;
