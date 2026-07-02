import { motion } from "framer-motion";
import imageN from "../images/photo.jpeg";

function About() {
  return (
    <section
      id="about"
      className="theme-section relative bg-gradient-to-r from-blue-100 via-white to-amber-100 py-20 md:py-28 lg:py-32 min-h-[80vh] flex items-center scroll-mt-28 overflow-hidden transition-colors duration-300"
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
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-widest text-gray-900 dark:text-white transition-colors duration-300">
            About <span className="text-primary dark:text-[#D4C990]">Me</span>
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
            className="flex flex-col gap-4 text-justify md:text-left flex-1"
          >
            <p className="theme-text-muted text-[16px] text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
              My studies have helped me build a strong foundation in{" "}
              <span className="font-semibold text-primary dark:text-[#D4C990]">software development</span>{" "}
              and problem-solving. I enjoy learning how systems work and turning ideas into clean,
              practical applications.
            </p>

            <p className="theme-text-muted text-[16px] text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
              Along the way, I've improved my skills in{" "}
              <span className="font-semibold text-primary dark:text-[#D4C990]">programming</span>,{" "}
              <span className="font-semibold text-primary dark:text-[#D4C990]">database design</span>, and{" "}
              <span className="font-semibold text-primary dark:text-[#D4C990]">web technologies</span>{" "}
              while exploring Artificial Intelligence concepts through coursework and small projects.
            </p>

            <p className="theme-text-muted text-[16px] text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
              I am continuously expanding my technical knowledge by experimenting with different technologies, refining my
              coding practices, and learning from real-world project experiences.
              My goal is to build a portfolio that highlights steady growth, meaningful learning, and the ability to adapt and improve over time.
            </p>
          </motion.div>

          {/* Portrait Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            viewport={{ once: true }}
            className="w-full max-w-xs flex-shrink-0"
          >
            <img
              src={imageN}
              alt="Ashan Akalanka"
              className="w-full h-auto object-cover object-top"
              style={{ maxHeight: "380px" }}
            />
          </motion.div>

        </div>

      </div>
    </section>
  );
}

export default About;
