import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaInstagram, FaFacebook, FaWhatsapp, FaEnvelope, FaLinkedin, FaCopy, FaCheck } from "react-icons/fa";
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
        { icon: FaGithub, href: "https://github.com/AshanAkalanka", name: "GitHub", color: "text-[#f0f6fc]" },
        { icon: FaLinkedin, href: "#", name: "LinkedIn", color: "text-[#0A66C2]" },
        { icon: FaInstagram, href: "#", name: "Instagram", color: "text-[#E4405F]" },
        { icon: FaFacebook, href: "#", name: "Facebook", color: "text-[#1877F2]" },
        { icon: FaWhatsapp, href: "#", name: "WhatsApp", color: "text-[#25D366]" },
    ];

    return (
        <section
            id="contact"
            className="theme-section section-dark-contact py-16 md:py-20 lg:py-24 bg-[#081a2f] transition-colors duration-300 relative overflow-hidden flex items-center min-h-[80vh]"
        >
            <div className="container mx-auto px-6 max-w-6xl relative z-10 flex flex-col justify-center w-full h-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10 md:mb-14 relative z-10"
                >
                    <span className="text-[#64ffda] font-semibold text-xs tracking-wider uppercase mb-2 block">
                        What's Next?
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-widest text-[#d7def7] mb-3 transition-colors duration-300">
                        Get In <span className="text-[#64ffda]">Touch</span>
                    </h2>

                </motion.div>

                <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 w-full">
                    <motion.div
                        initial={{ opacity: 0, x: -18 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="w-full lg:w-1/2"
                    >
                        <h3 className="text-2xl font-bold mb-8 text-[#d7def7]">Send a Message</h3>

                        <AnimatePresence mode="wait">
                            {submitStatus === "success" ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="theme-panel contact-card flex flex-col items-center justify-center py-12 text-center bg-white/5 rounded-xl border border-white/10"
                                >
                                    <div className="w-16 h-16 bg-[#64ffda]/15 text-[#64ffda] rounded-full flex items-center justify-center mb-5">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <h4 className="text-xl font-bold text-[#d7def7] mb-2">Message Sent!</h4>
                                    <p className="theme-text-subtle text-[#a8b3d1] max-w-xs text-center text-sm">
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
                                            <label className="text-xs text-[#7f8aaa] mb-1 block group-hover:text-[#64ffda] transition-colors">Name *</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full bg-transparent border-b border-[#7f8aaa] py-2 focus:outline-none focus:border-[#64ffda] text-[#d7def7] transition-colors"
                                                required
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                        <div className="relative group">
                                            <label className="text-xs text-[#7f8aaa] mb-1 block group-hover:text-[#64ffda] transition-colors">Email *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full bg-transparent border-b border-[#7f8aaa] py-2 focus:outline-none focus:border-[#64ffda] text-[#d7def7] transition-colors"
                                                required
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                    </div>

                                    <div className="relative mb-8 group">
                                        <label className="text-xs text-[#7f8aaa] mb-1 block group-hover:text-[#64ffda] transition-colors">Subject *</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full bg-transparent border-b border-[#7f8aaa] py-2 focus:outline-none focus:border-[#64ffda] text-[#d7def7] transition-colors"
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>

                                    <div className="relative mb-10 group">
                                        <label className="text-xs text-[#7f8aaa] mb-1 block group-hover:text-[#64ffda] transition-colors">Message *</label>
                                        <textarea
                                            name="message"
                                            rows="2"
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full bg-transparent border-b border-[#7f8aaa] py-2 focus:outline-none focus:border-[#64ffda] text-[#d7def7] resize-none transition-colors"
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
                                        className="mt-2 inline-flex w-full md:w-auto items-center justify-center gap-2 px-8 py-3 rounded-full bg-[#64ffda] text-[#081a2f] hover:bg-[#49dcbf] transition-all font-semibold text-sm disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
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

                    {/* RIGHT SIDE - redesigned */}
                    <motion.div
                        initial={{ opacity: 0, x: 18 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-full lg:w-1/2 flex flex-col justify-start lg:pl-10"
                    >
                        {/* Availability badge */}
                        <div className="inline-flex items-center gap-2 mb-6 w-fit px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 tracking-wide">
                                Available for new opportunities
                            </span>
                        </div>

                        <h3 className="text-2xl font-bold mb-3 text-[#d7def7]">Let's build something</h3>
                        <p className="theme-text-subtle text-[#a8b3d1] text-sm leading-relaxed mb-8 max-w-md">
                            Have a project in mind or just want to say hello? My inbox is always open -
                            I try to reply to every message within a day or two.
                        </p>

                        {/* Email card */}
                        <button
                            type="button"
                            onClick={handleCopyEmail}
                            aria-label={copied ? "Email copied" : "Copy email address"}
                            className="contact-card group relative mb-10 flex w-full max-w-md items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.03] p-4 text-left shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-[#64ffda]/50 hover:shadow-lg"
                        >
                            <div className="flex items-center gap-3.5 min-w-0">
                                <div className="shrink-0 w-11 h-11 rounded-lg bg-[#64ffda]/15 text-[#64ffda] flex items-center justify-center group-hover:scale-105 transition-transform">
                                    <FaEnvelope className="text-lg" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[11px] uppercase tracking-wider font-semibold text-[#7f8aaa] mb-0.5">
                                        Email
                                    </p>
                                    <p className="max-w-[11rem] truncate text-sm font-semibold text-[#d7def7] sm:max-w-none">
                                        {emailAddress}
                                    </p>
                                </div>
                            </div>
                            <span className="shrink-0 inline-flex min-w-[4.25rem] items-center justify-center rounded-lg px-2 py-2 text-xs font-semibold text-[#7f8aaa] transition-colors group-hover:bg-[#64ffda]/15 group-hover:text-[#64ffda]">
                                <AnimatePresence mode="wait">
                                    {copied ? (
                                        <motion.span
                                            key="check"
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0.5, opacity: 0 }}
                                            className="inline-flex items-center gap-1 text-emerald-500"
                                        >
                                            <FaCheck className="text-sm" />
                                            Copied
                                        </motion.span>
                                    ) : (
                                        <motion.span
                                            key="copy"
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0.5, opacity: 0 }}
                                            className="inline-flex items-center gap-1"
                                        >
                                            <FaCopy className="text-sm" />
                                            Copy
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </span>
                        </button>

                        {/* Socials */}
                        <div>
                            <p className="text-[11px] uppercase tracking-wider font-semibold text-[#7f8aaa] mb-4">
                                Find me elsewhere
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-md">
                                {socials.map((social, idx) => (
                                    <motion.a
                                        key={idx}
                                        href={social.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        whileHover={{ y: -3 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        className="contact-card group flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-3 transition-all duration-300 hover:border-[#64ffda]/50 hover:shadow-md"
                                    >
                                        <social.icon className={`text-lg ${social.color} transition-transform duration-300 group-hover:scale-110 shrink-0`} />
                                        <span className="text-xs font-semibold text-[#a8b3d1] group-hover:text-[#d7def7] transition-colors truncate">
                                            {social.name}
                                        </span>
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default Contact;
