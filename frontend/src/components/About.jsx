import { motion } from "framer-motion";
import imageN from "../images/photo11.jpeg";
import ProgressiveImage from "./ProgressiveImage";

function About() {
  return (
    <section
      id="about"
      className="theme-section section-dark-about relative bg-[#081a2f] py-16 md:py-24 lg:py-28 min-h-[80vh] flex items-center scroll-mt-28 overflow-hidden transition-colors duration-300"
    >
      {/* Main Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center gap-12">

        {/* Title + Italic Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-4"
        >
          <h2 className="section-heading text-gray-900 dark:text-[#d7def7] transition-colors duration-300">
            About <span className="text-[#2563EB] dark:text-[#38BDF8]">Me</span>
          </h2>
        </motion.div>

        {/* Content Row: Description Left, Image Right */}
        <div className="w-full flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-16">
          
          {/* Description Paragraphs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4 text-left flex-1"
          >
            <p className="body-copy theme-text-muted text-gray-700 dark:text-[#a8b3d1] transition-colors duration-300">
              I am a third-year{" "}
              <span className="font-semibold text-[#2563EB] dark:text-[#38BDF8]">Artificial Intelligence undergraduate</span>{" "}
              at <span className="font-semibold text-[#2563EB] dark:text-[#38BDF8]">SLIIT</span> with a strong interest in AI,
              machine learning, and software development. I enjoy building practical, user-friendly applications.
              My studies have helped me build a strong foundation in{" "}
              <span className="font-semibold text-[#2563EB] dark:text-[#38BDF8]">software development</span>{" "}
              and <span className="font-semibold text-[#2563EB] dark:text-[#38BDF8]">problem-solving</span>. I enjoy learning how systems work and turning ideas into clean, practical applications.
            </p>

            <p className="body-copy theme-text-muted text-gray-700 dark:text-[#a8b3d1] transition-colors duration-300">
              Along the way, I've improved my skills in{" "}
              <span className="font-semibold text-[#2563EB] dark:text-[#38BDF8]">programming</span>,{" "}
              <span className="font-semibold text-[#2563EB] dark:text-[#38BDF8]">database design</span>, and{" "}
              <span className="font-semibold text-[#2563EB] dark:text-[#38BDF8]">web technologies</span>{" "}
              while exploring Artificial Intelligence concepts through coursework and small projects.
            </p>

            <p className="body-copy theme-text-muted text-gray-700 dark:text-[#a8b3d1] transition-colors duration-300">
              I am continuously expanding my technical knowledge by experimenting with different technologies, refining my
              coding practices, and learning from real-world project experiences.
            </p>
          </motion.div>

          {/* Portrait Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            viewport={{ once: true }}
            className="about-image-frame group w-full max-w-xs flex-shrink-0 rounded-xl shadow-lg"
          >
            <div className="about-image-inner">
              <ProgressiveImage
                src={imageN}
                alt="Ashan Akalanka"
                wrapperClassName="aspect-[4/5] w-full"
                className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.025]"
              />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

export default About;
