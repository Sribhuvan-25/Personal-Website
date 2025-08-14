import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { BsSun, BsMoon, BsList } from 'react-icons/bs';
import { IoDocumentTextOutline } from "react-icons/io5";
import { Link, useLocation } from 'react-router-dom';
import { RiArticleLine } from 'react-icons/ri';
import { useState, useRef, useEffect } from 'react';
import { FaGoogleScholar } from "react-icons/fa6";
import { usePersonalInfo } from "../hooks/useContent";

const Navbar = ({ isDarkMode, toggleDarkMode }) => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { data: personalInfo } = usePersonalInfo();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const menuItems = [
        {
            icon: <FaLinkedin />,
            label: 'LinkedIn',
            href: 'https://www.linkedin.com/in/sribhuvanyellu/',
            external: true
        },
        {
            icon: <FaGithub />,
            label: 'GitHub',
            href: 'https://github.com/Sribhuvan-25',
            external: true
        },
        {
            icon: <RiArticleLine />,
            label: 'Blog',
            href: '/blog',
            external: false
        },
        {
            icon: <FaGoogleScholar />,
            label: 'Google Scholar',
            href: 'https://scholar.google.com/citations?user=cUw6RjUAAAAJ&hl=en&authuser=2',
            external: true
        },
    ];

    return (
        <nav className="mb-20 flex items-center justify-between py-4 px-4 sm:px-8">
            <div className="flex flex-shrink-0 items-center">
                <img 
                    src={personalInfo?.aboutImage || "https://via.placeholder.com/60x40?text=Logo"} 
                    alt="logo" 
                    style={{ width: '60px', height: '40px' }} 
                />
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4">
                {/* Dropdown Menu */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="hover:text-blue-500 transition-colors p-1 text-xl sm:text-2xl"
                        title="Menu"
                    >
                        <BsList />
                    </button>

                    {/* Dropdown Content */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg py-2 z-50">
                            {menuItems.map((item, index) => (
                                <div key={index}>
                                    {item.external ? (
                                        <a
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 px-4 py-2 text-neutral-300 hover:text-cyan-300 hover:bg-neutral-700 transition-colors"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            <span className="text-lg">{item.icon}</span>
                                            <span>{item.label}</span>
                                        </a>
                                    ) : (
                                        <Link
                                            to={item.href}
                                            className="flex items-center gap-3 px-4 py-2 text-neutral-300 hover:text-cyan-300 hover:bg-neutral-700 transition-colors"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            <span className="text-lg">{item.icon}</span>
                                            <span>{item.label}</span>
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <button
                    onClick={toggleDarkMode}
                    className="hover:text-blue-500 transition-colors p-1 text-xl sm:text-2xl"
                    title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                    {isDarkMode ? <BsSun /> : <BsMoon />}
                </button>
            </div>
        </nav>
    );
};

export default Navbar; 