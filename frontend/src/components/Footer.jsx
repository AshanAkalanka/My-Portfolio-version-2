function Footer() {
    return (
        <footer className="border-t border-gray-200 dark:border-gray-800 bg-[#F5F5F7] dark:from-[#0a192f] dark:via-[#0f2545] dark:to-[#0a192f] dark:bg-gradient-to-r py-6 transition-colors duration-300">
            <div className="max-w-7xl mx-auto text-center text-sm font-medium text-gray-700 dark:text-gray-400 transition-colors duration-300">
                © {new Date().getFullYear()} My Portfolio | All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
