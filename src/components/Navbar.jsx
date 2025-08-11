import logo from "../assets/nameLogo.png"
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { BsSun, BsMoon } from 'react-icons/bs';
import resume from "../assets/resume.pdf";
import { IoDocumentTextOutline } from "react-icons/io5";
import { Link, useLocation } from 'react-router-dom';
import { RiArticleLine } from 'react-icons/ri';

const Navbar = ({ isDarkMode, toggleDarkMode }) => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <nav className="mb-20 flex items-center justify-between py-4 px-4 sm:px-8">
            <div className="flex flex-shrink-0 items-center">
                <img src={logo} alt="logo" style={{ width: '60px', height: '40px' }} />
            </div>
            <div className="flex items-center justify-end gap-2 sm:gap-4 text-xl sm:text-2xl">
                <a href={resume} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
                    <IoDocumentTextOutline />
                </a>

                <a href="https://www.linkedin.com/in/sribhuvanyellu/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
                    <FaLinkedin />
                </a>
                
                <a href="https://github.com/Sribhuvan-25" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
                    <FaGithub />
                </a>

                <Link to="/blog" className="hover:text-blue-500 transition-colors" title="Blog">
                    <RiArticleLine />
                </Link>

                {/* Theme Toggle */}
                <button
                    onClick={toggleDarkMode}
                    className="hover:text-blue-500 transition-colors p-1"
                    title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                    {isDarkMode ? <BsSun /> : <BsMoon />}
                </button>
            </div>
        </nav>
    );
};

export default Navbar; 