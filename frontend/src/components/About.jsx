import { motion } from "framer-motion";
import imageN from "../images/photo.png";

function About() {

  return (
    <section
      id="about"
      className="theme-section relative bg-gradient-to-r from-blue-100 via-white to-amber-100 py-20 md:py-28 lg:py-32 min-h-[80vh] flex items-center scroll-mt-28 overflow-hidden transition-colors duration-300"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#5AA9FF]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true }}
            className="lg:pr-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
              About <span className="text-blue-600 dark:text-[#5AA9FF]">Me</span>
            </h2>

            <p className="theme-text-muted mt-5 text-[16px] text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
              My studies have helped me build a strong foundation in software development and
              problem-solving. I enjoy learning how systems work and turning ideas into clean,
              practical applications.
            </p>

            <p className="theme-text-muted mt-4 text-[16px] text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
              Along the way, I've improved my skills in programming, database design, and web
              technologies while exploring Artificial Intelligence concepts through coursework
              and small projects.
            </p>

            <p className="theme-text-muted mt-4 text-[16px] text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
              I am continuously expanding my technical knowledge by experimenting with different technologies, refining my coding practices,
              and learning from real-world project experiences.
              My goal is to build a portfolio that highlights steady growth, meaningful learning, and the ability to adapt and improve over time.
            </p>
          </motion.div>

          {/* RIGHT SIDE - IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center items-center h-full w-full lg:pl-10 lg:pt-0 pt-10"
          >
            <div className="theme-panel relative w-fit max-w-md mx-auto rounded-2xl overflow-hidden p-2 bg-white/10 shadow-[0_0_30px_rgba(255,255,255,0.1)] backdrop-blur-xl group">
              <img
                src={imageN}
                alt="About"
                className="w-auto h-auto max-h-[300px] md:max-h-[400px] object-contain rounded-xl transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
