import logo from "../assets/nameLogo.png"
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { BsSun, BsMoon } from 'react-icons/bs';
import resume from "../assets/resume.pdf";
import { IoDocumentTextOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { RiArticleLine } from 'react-icons/ri';

const Navbar = ({ isDarkMode, toggleDarkMode }) => {
    return (
        <nav className="mb-20 flex items-center justify-between py-4 px-8">
            <div className="flex flex-shrink-0 items-center">
                <img src={logo} alt="logo" style={{ width: '60px', height: '40px' }} />
            </div>
            <div className="flex items-center space-x-6">
                <Link to="/" className="text-neutral-300 hover:text-cyan-300 transition-colors">
                    Home
                </Link>
                <Link to="/blog" className="text-neutral-300 hover:text-cyan-300 transition-colors flex items-center gap-1">
                    <RiArticleLine />
                    Blog
                </Link>
            </div>
            <div className="flex items-center justify-end gap-4 text-2xl">
                <a href={resume} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
                    <IoDocumentTextOutline />
                </a>

                <a href="https://www.linkedin.com/in/sribhuvanyellu/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
                    <FaLinkedin />
                </a>
                
                <a href="https://github.com/Sribhuvan-25" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
                    <FaGithub />
                </a>

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