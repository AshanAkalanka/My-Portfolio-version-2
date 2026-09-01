import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaInstagram, FaFacebook, FaWhatsapp, FaEnvelope, FaLinkedin, FaCopy, FaCheck, FaFileDownload } from "react-icons/fa";
import { MessageSquare } from "lucide-react";
import axios from "axios";

const apiBaseUrl = (process.env.REACT_APP_API_URL || "").replace(/\/$/, "");
const emailAddress = "ashan2003work@gmail.com";

const copyTextToClipboard = async (text) => {
    if (navigator.clipboard?.writeText) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (error) {
            // Fall back for browsers that expose the API but deny permission.
        }
    }

    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.top = "-9999px";
    document.body.appendChild(textArea);
    textArea.select();

    try {
        return document.execCommand("copy");
    } finally {
        document.body.removeChild(textArea);
    }
};

function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [copied, setCopied] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            await axios.post(`${apiBaseUrl}/api/contact`, formData);
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

    const handleCopyEmail = async () => {
        try {
            const didCopy = await copyTextToClipboard(emailAddress);
            if (didCopy) {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const socials = [
        { icon: FaGithub, href: "https://github.com/AshanAkalanka", name: "GitHub", color: "text-gray-900 dark:text-[#f0f6fc]" },
        { icon: FaLinkedin, href: "https://www.linkedin.com/in/ashanakalanka", name: "LinkedIn", color: "text-[#0A66C2]" },
        { icon: FaInstagram, href: "#", name: "Instagram", color: "text-[#E4405F]" },
        { icon: FaFacebook, href: "#", name: "Facebook", color: "text-[#1877F2]" },
        { icon: FaWhatsapp, href: "#", name: "WhatsApp", color: "text-[#25D366]" },
        { icon: FaFileDownload, href: "/resume.pdf", name: "Download CV", color: "text-[#2563EB] dark:text-[#38BDF8]", download: true },
    ];

    return (
        <motion.section
            id="contact"
            className="theme-section section-dark-contact scroll-mt-24 pb-16 pt-10 md:pb-20 md:pt-12 lg:pb-24 lg:pt-14 transition-colors duration-300 relative overflow-hidden flex items-center min-h-[80vh]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
        >
            <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-16 lg:gap-24 w-full h-full">
                {/* Left Side: Text and Socials */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="w-full lg:w-1/2 flex flex-col justify-start lg:pt-2"
                >
                    <div className="mb-4">
                        <div className="flex items-center gap-2 mb-3">
                            <MessageSquare className="w-4 h-4 text-[#2563EB] dark:text-[#38BDF8]" />
                            <span className="section-kicker block text-[#2563EB] dark:text-[#38BDF8]">
                                What's Next?
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-[#d7def7] leading-tight">
                            Get In <span className="text-gray-900 dark:text-[#d7def7]">Touch</span>
                        </h2>
                    </div>

                    <p className="section-description text-gray-600 dark:text-[#a8b3d1] leading-relaxed max-w-md mb-10">
                        Have a project in mind or just want to say hello? My inbox is always open - I try to reply to every message within a day or two.
                    </p>

                    {/* Social Buttons */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-lg">
                        <button
                            onClick={handleCopyEmail}
                            className="group flex items-center justify-start gap-2.5 rounded-lg border border-transparent hover:border-gray-200 hover:bg-white/50 px-4 py-2.5 transition-all duration-300 dark:hover:border-white/10 dark:hover:bg-white/5 relative bg-gray-50 dark:bg-white/5 w-full"
                            aria-label="Copy Email"
                        >
                            <FaEnvelope className="text-lg text-[#2563EB] dark:text-[#38BDF8] transition-transform duration-300 group-hover:scale-110 opacity-90 group-hover:opacity-100 shrink-0" />
                            <span className="text-xs font-semibold text-gray-700 dark:text-[#d7def7] transition-colors truncate">
                                Email
                            </span>
                            <AnimatePresence>
                                {copied && (
                                    <motion.span 
                                        initial={{ opacity: 0, y: 10 }} 
                                        animate={{ opacity: 1, y: 0 }} 
                                        exit={{ opacity: 0 }} 
                                        className="absolute -top-10 left-1/2 -translate-x-1/2 text-xs text-emerald-500 flex items-center gap-1 font-semibold bg-white dark:bg-gray-800 px-3 py-1.5 rounded-md shadow-md border border-gray-100 dark:border-gray-700 whitespace-nowrap z-50"
                                    >
                                        <FaCheck /> Copied
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </button>
                        
                        {socials.map((social, idx) => (
                            <a
                                key={idx}
                                href={social.href}
                                target="_blank"
                                rel="noreferrer"
                                download={social.download ? true : undefined}
                                className="group flex items-center justify-start gap-2.5 rounded-lg border border-transparent hover:border-gray-200 hover:bg-white/50 px-4 py-2.5 transition-all duration-300 dark:hover:border-white/10 dark:hover:bg-white/5 bg-gray-50 dark:bg-white/5 w-full"
                            >
                                <social.icon className={`text-lg ${social.color} transition-transform duration-300 group-hover:scale-110 opacity-90 group-hover:opacity-100 shrink-0`} />
                                <span className="text-xs font-semibold text-gray-700 dark:text-[#d7def7] transition-colors truncate">
                                    {social.name}
                                </span>
                            </a>
                        ))}
                    </div>
                </motion.div>

                {/* Right Side: Form */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="w-full lg:w-1/2 relative z-10"
                >
                    <AnimatePresence mode="wait">
                        {submitStatus === "success" ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                role="status"
                                aria-live="polite"
                                className="flex flex-col items-center justify-center py-16 text-center"
                            >
                                <div className="w-20 h-20 bg-[#2563EB]/10 text-[#2563EB] dark:bg-[#38BDF8]/15 dark:text-[#38BDF8] rounded-full flex items-center justify-center mb-6">
                                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                <h4 className="text-2xl font-bold text-gray-900 dark:text-[#d7def7] mb-3">Message Sent!</h4>
                                <p className="theme-text-subtle text-gray-600 dark:text-[#a8b3d1] max-w-sm text-center">
                                    Thanks for reaching out! I've received your message and will respond as soon as possible.
                                </p>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-full flex flex-col gap-6 mt-4"
                                onSubmit={handleSubmit}
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    <div className="relative group flex flex-col gap-1">
                                        <label htmlFor="contact-name" className="text-xs font-semibold text-gray-900 dark:text-[#d7def7]">Your Name*</label>
                                        <input
                                            id="contact-name"
                                            type="text"
                                            name="name"
                                            autoComplete="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full bg-transparent border-b border-gray-300 dark:border-[#7f8aaa]/50 py-2 focus:outline-none focus:border-[#2563EB] dark:focus:border-[#38BDF8] text-gray-900 dark:text-[#d7def7] transition-colors text-sm"
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <div className="relative group flex flex-col gap-1">
                                        <label htmlFor="contact-email" className="text-xs font-semibold text-gray-900 dark:text-[#d7def7]">Email*</label>
                                        <input
                                            id="contact-email"
                                            type="email"
                                            name="email"
                                            autoComplete="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-transparent border-b border-gray-300 dark:border-[#7f8aaa]/50 py-2 focus:outline-none focus:border-[#2563EB] dark:focus:border-[#38BDF8] text-gray-900 dark:text-[#d7def7] transition-colors text-sm"
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                </div>

                                <div className="relative group flex flex-col gap-1">
                                    <label htmlFor="contact-subject" className="text-xs font-semibold text-gray-900 dark:text-[#d7def7]">Subject*</label>
                                    <input
                                        id="contact-subject"
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-b border-gray-300 dark:border-[#7f8aaa]/50 py-2 focus:outline-none focus:border-[#2563EB] dark:focus:border-[#38BDF8] text-gray-900 dark:text-[#d7def7] transition-colors text-sm"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="relative group flex flex-col gap-1 mt-2">
                                    <label htmlFor="contact-message" className="text-xs font-semibold text-gray-900 dark:text-[#d7def7] mb-2">Your Message</label>
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 dark:bg-white/[0.02] border border-gray-300 dark:border-[#7f8aaa]/50 px-4 py-3 focus:outline-none focus:border-[#2563EB] dark:focus:border-[#38BDF8] text-gray-900 dark:text-[#d7def7] resize-none transition-colors text-sm"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>

                                {submitStatus === "error" && (
                                    <p role="alert" className="text-red-500 dark:text-red-400 text-sm font-medium">
                                        Something went wrong! Please try again later.
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex w-fit items-center justify-center mx-auto sm:mx-0 sm:self-start gap-2 rounded-full bg-[#2563EB] px-8 py-3 text-sm font-medium text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1D4ED8] hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 dark:bg-[#38BDF8] dark:text-[#081a2f] dark:hover:bg-[#0EA5E9] mt-2"
                                >
                                    {isSubmitting ? (
                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        "Send Message"
                                    )}
                                </button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </motion.section>
    );
}

export default Contact;
