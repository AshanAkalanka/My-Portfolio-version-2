function Footer() {
    return (
        <footer className="theme-section bg-gradient-to-r from-blue-100 via-white to-amber-100 py-6 transition-colors duration-300">
            <div className="theme-text-subtle max-w-7xl mx-auto text-center text-sm font-medium text-gray-700 dark:text-gray-400 transition-colors duration-300">
                &copy; {new Date().getFullYear()} My Portfolio | All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
