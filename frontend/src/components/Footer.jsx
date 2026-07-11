function Footer() {
    return (
        <footer className="theme-section section-dark-footer bg-[#081a2f] py-6 transition-colors duration-300">
            <div className="theme-text-subtle max-w-7xl mx-auto text-center text-sm font-medium text-gray-600 dark:text-[#a8b3d1] transition-colors duration-300">
                &copy; {new Date().getFullYear()} My Portfolio | All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
