import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { FiMail as Mail, FiCopy as Copy, FiCheck as Check, FiGithub as Github, FiLinkedin as Linkedin, FiDownload as Download, FiLoader as LoaderCircle, FiInstagram, FiFacebook, FiMessageCircle } from "react-icons/fi";
import { FiArrowRight as ArrowRight } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const apiBaseUrl = (process.env.REACT_APP_API_URL || "").replace(/\/$/, "");
const emailAddress = "ashan2003work@gmail.com";
const socialLinks = [
    { label: "Email", href: "mailto:" + emailAddress, Icon: Mail, color: "mail" },
    { label: "GitHub", href: "https://github.com/AshanAkalanka", Icon: Github, color: "github", external: true },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ashanakalanka", Icon: Linkedin, color: "linkedin", external: true },
    // Keep the requested placeholders until the real profile URLs are supplied.
    { label: "Instagram", href: "#", Icon: FiInstagram, color: "instagram", placeholder: true },
    { label: "Facebook", href: "#", Icon: FiFacebook, color: "facebook", placeholder: true },
    { label: "WhatsApp", href: "#", Icon: FaWhatsapp, color: "whatsapp", placeholder: true },
];

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

function Contact({ id = "contact" }) {
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
            const response = await fetch(`${apiBaseUrl}/api/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (!response.ok) throw new Error(`Contact request failed: ${response.status}`);
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

    return (
        <section id={id || undefined} className="design-section contact-section">
            <div className="design-container contact-layout">
                <Reveal className="contact-intro">
                    <p className="design-eyebrow"><span>05</span> LET'S CONNECT</p>
                    <h2>Have an idea?<br /><span>Let's make it real</span></h2>
                    <p>Whether it's an opportunity, a collaboration, or just a good conversation, I'd love to hear from you.</p>
                    <div className="contact-email"><Mail size={20} aria-hidden="true" /><a href={"mailto:" + emailAddress}>{emailAddress}</a><button type="button" onClick={handleCopyEmail} aria-label={copied ? "Email copied" : "Copy email"}>{copied ? <Check size={18} /> : <Copy size={18} />}</button></div>
                </Reveal>
                <Reveal className="contact-form-column" delay={0.1}>
                <form className="contact-form" onSubmit={handleSubmit}>
                    <h3><FiMessageCircle className="contact-heading-icon" size={22} aria-hidden="true" /><span>Drop me a message</span><ArrowRight className="contact-heading-arrow" size={26} aria-hidden="true" /></h3>
                    <div className="contact-form-row">
                        <div className="form-field"><label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" autoComplete="name" placeholder="How should I call you?" value={formData.name} onChange={handleChange} required disabled={isSubmitting} /></div>
                        <div className="form-field"><label htmlFor="contact-email">Email address</label><input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required disabled={isSubmitting} /></div>
                    </div>
                    <div className="form-field"><label htmlFor="contact-subject">Subject</label><input id="contact-subject" name="subject" placeholder="What's on your mind?" value={formData.subject} onChange={handleChange} required disabled={isSubmitting} /></div>
                    <div className="form-field"><label htmlFor="contact-message">Your Message</label><textarea id="contact-message" name="message" rows="5" placeholder="Tell me a little about it…" value={formData.message} onChange={handleChange} className="rounded-xl w-full bg-slate-50 dark:bg-[#102541] border border-slate-300 dark:border-[#94a3b8]/50 px-4 py-3 focus:outline-none focus:border-[#2563EB] dark:focus:border-[#38BDF8] text-slate-900 dark:text-white resize-none transition-colors text-sm" required disabled={isSubmitting} /></div>
                    {submitStatus === "success" && <p className="form-success" role="status">Thanks for reaching out! Your message has been sent.</p>}
                    {submitStatus === "error" && <p className="form-error" role="alert">Your message couldn't be sent. Please try again or email me directly.</p>}
                    <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="design-button button-blue" type="submit" disabled={isSubmitting}>{isSubmitting ? <>Sending <LoaderCircle size={18} className="animate-spin" aria-hidden="true" /></> : <>Send message <ArrowRight size={22} aria-hidden="true" /></>}</motion.button>
                </form>
                </Reveal>
                <Reveal className="contact-connect" delay={0.15}>
                    <h3>Connect with me</h3>
                    <div className="contact-links-row">
                    <div className="contact-socials">
                        {socialLinks.map(({ label, href, Icon, color, external, placeholder }) => (
                            <a key={label} className={"contact-social-button contact-" + color} href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} aria-label={label} aria-disabled={placeholder || undefined} title={label} onClick={placeholder ? event => event.preventDefault() : undefined}><Icon size={23} aria-hidden="true" /></a>
                        ))}
                    </div>
                    <a className="contact-download design-button" href="/resume.pdf" download><Download size={18} aria-hidden="true" /> Download CV</a>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

export default Contact;
