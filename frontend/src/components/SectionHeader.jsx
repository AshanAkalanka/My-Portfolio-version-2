import Reveal from "./Reveal";

export default function SectionHeader({ number, label, title, description, action }) {
    return (
        <Reveal className="design-section-header">
            <div>
                <p className="design-eyebrow"><span>{number}</span> {label}</p>
                <h2>{title}</h2>
                {description && <p className="design-section-description">{description}</p>}
            </div>
            {action}
        </Reveal>
    );
}
