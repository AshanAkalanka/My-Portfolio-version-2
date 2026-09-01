import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

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
        institution: "Coursera · Google · Udemy",
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
                <div className="relative mb-10 flex flex-col items-center gap-3 md:mb-12">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="inline-flex items-center justify-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.15em] text-blue-600 dark:text-[#38BDF8]"
                    >
                        <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
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

                <div className="mt-12 md:mt-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-white/10">
                        {educationData.map((item, index) => (
                            <motion.article
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
                                className="flex flex-col items-start px-0 py-10 md:py-2 md:px-8 first:md:pl-0 last:md:pr-0"
                            >
                                <h3 className="text-lg md:text-xl font-black uppercase tracking-wider text-gray-900 dark:text-white mb-5 min-h-[3.5rem]">
                                    {item.title}
                                </h3>
                                
                                <div className="text-[13px] md:text-sm font-medium leading-relaxed text-gray-600 dark:text-gray-400 mb-2 flex-grow">
                                    <span className="block font-bold text-[#2563EB] dark:text-[#38BDF8] mb-1">{item.code}</span>
                                    <span className="block font-bold text-gray-800 dark:text-gray-200 mb-3">{item.institution}</span>
                                    {item.detail}
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
