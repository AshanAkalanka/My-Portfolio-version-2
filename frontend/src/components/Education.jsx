import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { FiAward, FiBookOpen, FiCpu, FiPause, FiPlay, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Reveal from "./Reveal";
import usePageVisibility from "../hooks/usePageVisibility";

const educationData = [
    {
        id: 1,
        code: "2019—2022",
        title: "Advanced Level (Commerce Stream)",
        institution: "Eheliyagoda Central College",
        detail: "Accounting, Business Studies, Information Technology, and practical commerce fundamentals.",
        ongoing: false,
        featured: false,
        Icon: FiBookOpen,
        theme: "commerce",
    },
    {
        id: 2,
        code: "2022—Present",
        title: "Certifications",
        institution: "Coursera · Google · Udemy",
        detail: "Prompt engineering, artificial intelligence, web development, and programming languages.",
        ongoing: true,
        featured: false,
        Icon: FiAward,
        theme: "certifications",
    },
    {
        id: 3,
        code: "2024—Present",
        title: "BSc (Hons) in IT Specialising in Artificial Intelligence",
        institution: "SLIIT",
        detail: "Machine learning, deep learning, software engineering, and modern web technologies.",
        ongoing: true,
        featured: true,
        Icon: FiCpu,
        theme: "degree",
    },
];

const educationCards = [...educationData].reverse();

export default function Education({ id = "education" }) {
    const carouselRef = useRef(null);
    const trackRef = useRef(null);
    const [activeCard, setActiveCard] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);
    const [interacting, setInteracting] = useState(false);
    const reducedMotion = useReducedMotion();
    const pageVisible = usePageVisibility();
    const inView = useInView(carouselRef, { amount: 0.3 });

    const moveCards = useCallback((direction) => {
        const track = trackRef.current;
        if (!track || !track.children || track.children.length === 0) return;
        const total = educationCards.length;
        const maxScroll = track.scrollWidth - track.clientWidth;

        setActiveCard((prevIndex) => {
            const nextIndex = direction > 0
                ? (prevIndex + 1 >= total ? 0 : prevIndex + 1)
                : (prevIndex - 1 < 0 ? total - 1 : prevIndex - 1);

            const targetCard = track.children[nextIndex];
            if (targetCard) {
                const targetLeft = nextIndex === 0
                    ? 0
                    : nextIndex === total - 1
                        ? maxScroll
                        : targetCard.offsetLeft;

                track.scrollTo({
                    left: targetLeft,
                    behavior: reducedMotion ? "instant" : "smooth"
                });
            }
            return nextIndex;
        });
    }, [reducedMotion]);

    const selectCard = (index) => {
        const track = trackRef.current;
        if (!track || !track.children[index] || index === activeCard) return;
        const maxScroll = track.scrollWidth - track.clientWidth;
        setAutoPlay(false);
        setActiveCard(index);
        const targetLeft = index === 0
            ? 0
            : index === educationCards.length - 1
                ? maxScroll
                : track.children[index].offsetLeft;

        track.scrollTo({
            left: targetLeft,
            behavior: reducedMotion ? "instant" : "smooth"
        });
    };

    useEffect(() => {
        if (!autoPlay || interacting || reducedMotion || !pageVisible || !inView) return;
        const timer = window.setTimeout(() => moveCards(1), 5000);
        return () => window.clearTimeout(timer);
    }, [activeCard, autoPlay, interacting, reducedMotion, pageVisible, inView, moveCards]);

    const updateActiveCard = () => {
        const track = trackRef.current;
        if (!track || !track.children || track.children.length === 0) return;
        const scrollLeft = track.scrollLeft;
        const maxScroll = track.scrollWidth - track.clientWidth;
        if (maxScroll <= 2) {
            setActiveCard(0);
            return;
        }
        if (scrollLeft >= maxScroll - 10) {
            setActiveCard(educationCards.length - 1);
            return;
        }
        let closestIndex = 0;
        let minDiff = Infinity;
        for (let i = 0; i < track.children.length; i++) {
            const diff = Math.abs(track.children[i].offsetLeft - scrollLeft);
            if (diff < minDiff) {
                minDiff = diff;
                closestIndex = i;
            }
        }
        setActiveCard(closestIndex);
    };

    return (
        <section id={id || undefined} className="design-section education-section">
            <div className="design-container education-layout">
                <Reveal className="design-section-header">
                    <div>
                        <div className="education-intro-title">
                            <p className="design-eyebrow"><span>04</span> EDUCATION</p>
                            <h2><span>Learning</span><br /><span>Growing</span><br /><span className="education-title-accent">Building</span></h2>
                        </div>
                        <p className="design-section-description">The foundation behind my work, and a journey that's still unfolding.</p>
                    </div>
                </Reveal>
                <div ref={carouselRef} className="education-carousel" role="region" aria-roledescription="carousel" aria-label="Education journey"
                    onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)}
                    onFocusCapture={() => setInteracting(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false); }}>
                    <div ref={trackRef} id="education-card-track" className="education-card-track" onScroll={updateActiveCard} tabIndex={0} aria-label="Swipe or use the arrow keys to explore education"
                        onTouchStart={() => setAutoPlay(false)} onKeyDown={event => {
                            if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
                            event.preventDefault();
                            setAutoPlay(false);
                            moveCards(event.key === "ArrowRight" ? 1 : -1);
                        }}>
                        {educationCards.map(({ Icon, ...item }, index) => (
                            <article className={"education-card education-card--" + item.theme} key={item.id} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${educationCards.length}`}>
                                <div className="education-card-art" aria-hidden="true"><span className="education-card-orbit" /><Icon /></div>
                                <div className="education-card-top"><span>{item.code}</span>{item.featured && <span className="education-card-badge">Current focus</span>}</div>
                                <div className="education-card-copy"><span className="education-card-number">0{index + 1} / EDUCATION</span><h3>{item.title}</h3><strong>{item.institution}</strong><p>{item.detail}</p></div>
                            </article>
                        ))}
                    </div>
                    <div className="education-carousel-controls">
                        <div className="education-carousel-arrows">
                            <button type="button" onClick={() => { setAutoPlay(false); moveCards(-1); }} aria-label="Previous education card" aria-controls="education-card-track"><FiChevronLeft size={28} strokeWidth={1.8} aria-hidden="true" /></button>
                            <button type="button" onClick={() => { setAutoPlay(false); moveCards(1); }} aria-label="Next education card" aria-controls="education-card-track"><FiChevronRight size={28} strokeWidth={1.8} aria-hidden="true" /></button>
                        </div>
                        <div className="education-carousel-pagination" role="group" aria-label="Choose education card">
                            {educationCards.map((item, index) => (
                                <button
                                    key={item.id}
                                    className={`carousel-pagination-button${index === activeCard ? " is-current" : ""}`}
                                    type="button"
                                    aria-label={`Show education card ${index + 1}: ${item.title}`}
                                    aria-current={index === activeCard ? "true" : undefined}
                                    onClick={() => selectCard(index)}
                                >
                                    {index === activeCard ? (
                                        <motion.span
                                            layoutId="education-active-card-pill"
                                            className="carousel-pagination-active-pill"
                                            aria-hidden="true"
                                            transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 38 }}
                                        />
                                    ) : <span className="carousel-pagination-indicator" aria-hidden="true" />}
                                </button>
                            ))}
                        </div>
                        <span className="education-carousel-count" aria-live={autoPlay && !reducedMotion ? "off" : "polite"}>0{activeCard + 1}<span> / 0{educationCards.length}</span></span>
                        {!reducedMotion && <button type="button" className="education-carousel-playback" onClick={() => setAutoPlay(value => !value)} aria-label={autoPlay ? "Pause education slideshow" : "Play education slideshow"}>{autoPlay ? <FiPause size={17} aria-hidden="true" /> : <FiPlay size={17} aria-hidden="true" />}</button>}
                    </div>
                </div>
            </div>
        </section>
    );
}
