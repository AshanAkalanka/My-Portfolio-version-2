import { motion } from "framer-motion";

const educationData = [
    {
        id: 1,
        code: "2019—2022",
        title: "Advanced Level (Commerce Stream)",
        institution: "Eheliyagoda Central College",
        detail: "Accounting, Business Studies, and Information Technology.",
        ongoing: false,
    },
    {
        id: 2,
        code: "2022—Present",
        title: "Certifications",
        institution: "Online Platforms",
        detail: "Prompt engineering, artificial intelligence, web development, and programming languages.",
        ongoing: true,
    },
    {
        id: 3,
        code: "2024—Present",
        title: "BSc (Hons) in IT Specialising in Artificial Intelligence",
        institution: "SLIIT",
        detail: "Machine learning, deep learning, software engineering, and modern web technologies.",
        ongoing: true,
    },
];

function Education() {
    return (
        <motion.section
            id="education"
            className="theme-section section-dark-education scroll-mt-24 bg-white px-5 py-16 text-[#001f4d] transition-colors duration-300 dark:text-[#f2f4f7] sm:px-6 md:py-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{
                duration: 0.65,
                ease: "easeOut",
            }}
        >
            <div className="mx-auto w-full max-w-5xl">
                {/* Heading */}
                <div className="relative mb-12 text-center md:mb-20">
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
                        transition={{
                            duration: 0.5,
                            delay: 0.05,
                        }}
                        className="section-heading text-gray-900 transition-colors duration-300 dark:text-[#d7def7]"
                    >
                        Education
                    </motion.h2>
                </div>

                <div className="relative">
                    {/* Mobile vertical connecting line */}
                    <div className="absolute bottom-4 left-[15px] top-4 w-px bg-[#b8c4d3] dark:bg-white/15 md:hidden" />

                    {/* Desktop horizontal connecting line */}
                    <div className="absolute left-0 right-0 top-[15px] hidden h-px bg-[#b8c4d3] dark:bg-white/15 md:block">
                        <motion.span
                            className="absolute -top-[3px] h-[7px] w-[7px] rounded-full bg-[#2563EB] shadow-[0_0_8px_rgba(37,99,235,0.6)] motion-reduce:hidden dark:bg-[#38BDF8]"
                            initial={{ left: "0%" }}
                            animate={{ left: "100%" }}
                            transition={{
                                duration: 3.2,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        />
                    </div>

                    <div className="grid gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-0">
                        {educationData.map((item, index) => (
                            <motion.article
                                key={item.id}
                                initial={{
                                    opacity: 0,
                                    y: 20,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                viewport={{
                                    once: true,
                                    margin: "-60px",
                                }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.15,
                                    ease: "easeOut",
                                }}
                                className="group relative flex items-start pl-11 text-left md:flex-col md:items-start md:pl-0"
                            >
                                {/* Timeline node */}
                                <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center md:relative md:mb-6">
                                    {item.ongoing && (
                                        <span className="absolute h-8 w-8 animate-ping rounded-full bg-[#2563EB]/25 motion-reduce:animate-none dark:bg-[#38BDF8]/25" />
                                    )}

                                    <span
                                        className={`relative h-3.5 w-3.5 rounded-full border-2 transition-transform duration-300 group-hover:scale-110 ${
                                            item.ongoing
                                                ? "border-[#2563EB] bg-white dark:border-[#38BDF8] dark:bg-[#081a2f]"
                                                : "border-[#b8c4d3] bg-[#b8c4d3] dark:border-white/30 dark:bg-white/30"
                                        }`}
                                    />
                                </div>

                                {/* Education information */}
                                <div className="w-full">
                                    <span className="inline-block font-mono text-[11px] font-semibold tabular-nums tracking-wide text-[#2563EB] dark:text-[#38BDF8]">
                                        {item.code}
                                    </span>

                                    <h3 className="mt-2 max-w-sm text-lg font-bold leading-snug text-gray-900 dark:text-white md:text-xl">
                                        {item.title}
                                    </h3>

                                    <p className="mt-1.5 text-sm font-semibold text-[#71819a] dark:text-[#9ca3af]">
                                        {item.institution}
                                    </p>

                                    <p className="body-copy mt-3 max-w-sm text-sm font-medium leading-relaxed text-[#536985] dark:text-[#b7bdc6]">
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