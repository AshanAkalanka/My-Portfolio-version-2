import { motion } from "framer-motion";
import certificateImage from "../images/certificate.png";

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
        title: "COLLAGE",
        institution: "Advanced Level Commerce Stream - Eheliyagoda Central Collage",
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
            className="scroll-mt-24 bg-[#1f2023] text-[#ecebd7] py-16 md:py-20 px-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.65, ease: "easeOut" }}
        >
            <div className="max-w-6xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
                    <div className="relative pl-14 md:pl-16">
                        <div className="absolute left-6 md:left-7 top-2 bottom-2 w-px bg-[#d7d4c4]" />

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
                                    <span className="absolute -left-[2.375rem] md:-left-[2.625rem] top-1.5 h-3 w-3 rounded-full bg-[#d7d4c4]" />
                                    <h3 className="text-base md:text-xl font-bold tracking-wide">
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 text-xs md:text-[13px] uppercase tracking-[0.12em] text-[#c7c4b3]">
                                        {item.period}
                                    </p>
                                    <p className="mt-3 text-xs md:text-sm leading-relaxed text-[#dfddcf] max-w-md">
                                        {item.institution}
                                    </p>
                                    <p className="mt-2 text-xs md:text-sm leading-relaxed text-[#dfddcf] max-w-md">
                                        {item.description}
                                    </p>
                                </motion.article>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <motion.h2
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase leading-[0.9]"
                        >
                            <span
                                className="normal-case mr-3 sm:mr-4 text-3xl sm:text-4xl md:text-5xl align-middle"
                                style={{ fontFamily: "cursive", fontWeight: 600 }}
                            >
                                my
                            </span>
                            education
                        </motion.h2>

                        <div className="relative mt-10 h-[320px] sm:h-[380px] md:h-[430px]">
                            <div className="absolute left-10 top-3 w-[55%] h-[80%] bg-[#eceae2] rotate-[-6deg] border-8 border-[#f5f3ec] shadow-2xl" />
                            <div className="absolute left-20 top-12 w-[60%] h-[82%] bg-[#f4f2eb] rotate-[7deg] border-8 border-[#f7f5ee] shadow-2xl" />

                            <motion.div
                                className="absolute left-24 top-14 w-[62%] h-[84%] bg-[#f4f2eb] border-8 border-[#f6f4ee] rotate-[11deg] shadow-2xl overflow-hidden"
                                initial={{ opacity: 0, y: 24, rotate: 6 }}
                                whileInView={{ opacity: 1, y: 0, rotate: 11 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.55 }}
                            >
                                <img
                                    src={certificateImage}
                                    alt="Education visual"
                                    className="h-full w-full object-cover"
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}

export default Education;
