function Footer() {
    return (
        <footer className="theme-section section-dark-footer bg-[#081a2f] py-5 transition-colors duration-300">
            <div className="theme-text-subtle mx-auto flex max-w-7xl flex-col items-center gap-2 px-6 text-center text-xs font-medium tracking-wide text-gray-500 transition-colors duration-300 dark:text-[#8f9ab8]">
                <p>Built and designed by Ashan Akalanka.</p>
                <p>&copy; {new Date().getFullYear()} Ashan. All rights reserved</p>
            </div>
        </footer>
    );
}

export default Footer;
