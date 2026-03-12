import { motion } from "framer-motion";
import { FaReact, FaCode, FaDatabase } from "react-icons/fa";
import { SiJavascript, SiPython, SiTensorflow } from "react-icons/si";
import imageN from "../images/photo.JPG";

function About() {

  const bgIcons = [
    FaReact,
    FaCode,
    FaDatabase,
    SiJavascript,
    SiPython,
    SiTensorflow,
  ];

  return (
    <section
      id="about"
      className="relative bg-white dark:bg-gray-900 py-16 scroll-mt-28 overflow-hidden transition-colors duration-300"
    >
      {/* MOVING TECH ICONS */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(55)].map((_, i) => {
          const Icon = bgIcons[i % bgIcons.length];

          const top = (i * 17) % 100;
          const left = (i * 29) % 100;

          return (
            <motion.div
              key={i}
              className="absolute text-emerald-500/20 dark:text-emerald-400/15"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                transform: "translate(-50%, -50%)",
              }}
              animate={{
                y: [0, -18, 0],
                x: [0, i % 2 === 0 ? 18 : -18, 0],
                rotate: [0, i % 2 === 0 ? 10 : -10, 0],
              }}
              transition={{
                duration: 5 + (i % 4),
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Icon className="text-[14px] md:text-[16px]" />
            </motion.div>
          );
        })}
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true }}
            className="lg:pr-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
              About <span className="text-blue-600 dark:text-[#64ffda]">Me</span>
            </h2>

            <p className="mt-5 text-[15px] text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
              My studies have helped me build a strong foundation in software development and
              problem-solving. I enjoy learning how systems work and turning ideas into clean,
              practical applications.
            </p>

            <p className="mt-4 text-[15px] text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
              Along the way, I've improved my skills in programming, database design, and web
              technologies while exploring Artificial Intelligence concepts through coursework
              and small projects.
            </p>

            <p className="mt-4 text-[15px] text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
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
            className="flex justify-center items-center h-full w-full lg:pl-10 lg:pt-0 pt-10 -translate-y-4 lg:-translate-y-8"
          >
            <div className="relative w-fit max-w-md mx-auto rounded-[2.5rem] overflow-hidden p-2 bg-white/10 dark:bg-white/5 shadow-[0_0_30px_rgba(255,255,255,0.1)] backdrop-blur-xl border border-white/20 dark:border-white/10 group">
              <img
                src={imageN}
                alt="About"
                className="w-auto h-auto max-h-[300px] md:max-h-[400px] object-contain rounded-[2rem] transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
