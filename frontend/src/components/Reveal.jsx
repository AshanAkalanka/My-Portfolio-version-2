import { motion, useReducedMotion } from "framer-motion";

const elements = { div: motion.div, article: motion.article, a: motion.a };

export default function Reveal({ as = "div", children, className = "", delay = 0, ...props }) {
    const reducedMotion = useReducedMotion();
    const Element = elements[as] || elements.div;

    return (
        <Element
            {...props}
            className={className}
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08, margin: "0px 0px 48px 0px" }}
            transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </Element>
    );
}
