import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaInstagram, FaFacebook, FaWhatsapp, FaEnvelope, FaLinkedin } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import axios from "axios";

function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            await axios.post("http://localhost:5000/api/contact", formData);
            setSubmitStatus("success");
            setFormData({ name: "", email: "", subject: "", message: "" });
            setTimeout(() => setSubmitStatus(null), 5000);
        } catch (error) {
            console.error(error);
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            id="contact"
            className="theme-section py-24 bg-gradient-to-r from-blue-100 via-white to-amber-100 transition-colors duration-300 relative overflow-hidden flex items-center min-h-[80vh]"
        >
            <div className="container mx-auto px-6 max-w-6xl relative z-10 flex flex-col justify-center w-full h-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 relative z-10"
                >
                    <span className="text-primary dark:text-[#D4C990] font-semibold text-xs tracking-wider uppercase mb-2 block">
                        What's Next?
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-widest text-gray-900 dark:text-white mb-3 transition-colors duration-300">
                        Get In <span className="text-primary dark:text-[#D4C990]">Touch</span>
                    </h2>

                </motion.div>

                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 w-full">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="w-full lg:w-1/2"
                    >
                        <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Send a Message</h3>

                        <AnimatePresence mode="wait">
                            {submitStatus === "success" ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="theme-panel flex flex-col items-center justify-center py-12 text-center bg-gray-100/50 rounded-xl border border-gray-200"
                                >
                                    <div className="w-16 h-16 bg-blue-100 dark:bg-[#D4C990]/20 text-primary dark:text-[#D4C990] rounded-full flex items-center justify-center mb-5">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h4>
                                    <p className="theme-text-subtle text-gray-600 dark:text-gray-400 max-w-xs text-center text-sm">
                                        Thanks for reaching out! I've received your message and will respond as soon as possible.
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="w-full"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 mt-4">
                                        <div className="relative group">
                                            <label className="text-xs text-gray-500 mb-1 block group-hover:text-primary transition-colors">Name *</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full bg-transparent border-b border-gray-400 py-2 focus:outline-none focus:border-primary text-gray-900 dark:text-white transition-colors"
                                                required
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                        <div className="relative group">
                                            <label className="text-xs text-gray-500 mb-1 block group-hover:text-primary transition-colors">Email *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full bg-transparent border-b border-gray-400 py-2 focus:outline-none focus:border-primary text-gray-900 dark:text-white transition-colors"
                                                required
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                    </div>

                                    <div className="relative mb-8 group">
                                        <label className="text-xs text-gray-500 mb-1 block group-hover:text-primary transition-colors">Subject *</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full bg-transparent border-b border-gray-400 py-2 focus:outline-none focus:border-primary text-gray-900 dark:text-white transition-colors"
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>

                                    <div className="relative mb-10 group">
                                        <label className="text-xs text-gray-500 mb-1 block group-hover:text-primary transition-colors">Message *</label>
                                        <textarea
                                            name="message"
                                            rows="2"
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full bg-transparent border-b border-gray-400 py-2 focus:outline-none focus:border-primary text-gray-900 dark:text-white resize-none transition-colors"
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>

                                    {submitStatus === "error" && (
                                        <p className="text-red-500 dark:text-red-400 text-sm font-medium mb-4">
                                            Something went wrong! Please try again later.
                                        </p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="mt-2 inline-flex w-full md:w-auto items-center justify-center gap-2 px-8 py-3 rounded-full bg-primary text-white dark:bg-[#D4C990] dark:text-gray-900 hover:bg-primary-hover dark:hover:bg-[#EAE1B8] transition-all font-semibold text-sm disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                                    >
                                        {isSubmitting ? (
                                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        ) : (
                                            "Reach Out Now"
                                        )}
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-full lg:w-1/2 flex flex-col justify-start lg:pl-10"
                    >
                        <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Contact Me</h3>

                        <div className="mb-10">
                            <a
                                href="mailto:ashan2003work@gmail.com"
                                className="inline-flex items-center gap-3 group transition-all duration-300 w-full max-w-md whitespace-nowrap"
                            >
                                <FaEnvelope className="text-primary dark:text-[#D4C990] text-xl shrink-0" />
                                <span className="theme-text-subtle text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider shrink-0">
                                    Email Address:
                                </span>
                                <span className="text-gray-900 dark:text-white font-medium group-hover:text-primary dark:group-hover:text-[#D4C990] transition-colors whitespace-nowrap">
                                    ashan2003work@gmail.com
                                </span>
                            </a>
                        </div>

                        <h3 className="text-xl font-bold mb-5 text-gray-900 dark:text-white">Connect with Me</h3>

                        <div className="flex flex-wrap gap-4">
                            {[
                                { icon: FaGithub, href: "https://github.com/AshanAkalanka", name: "GitHub" },
                                { icon: FaLinkedin, href: "#", name: "LinkedIn" },
                                { icon: FaInstagram, href: "#", name: "Instagram" },
                                { icon: FaFacebook, href: "#", name: "Facebook" },
                                { icon: FaWhatsapp, href: "#", name: "WhatsApp" },
                            ].map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    title={social.name}
                                    className="theme-text-muted text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-all duration-300 hover:-translate-y-1"
                                >
                                    <social.icon className="text-2xl" />
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default Contact;
