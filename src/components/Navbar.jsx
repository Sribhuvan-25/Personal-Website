import logo from "../assets/nameLogo.png"
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { BsSun, BsMoon } from 'react-icons/bs';
import resume from "../assets/resume.pdf";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaBlog } from 'react-icons/fa'; // Importing blog icon
import { Link } from 'react-router-dom'; // Importing Link for navigation

const Navbar = ({ isDarkMode, toggleDarkMode }) => {
    return (
        <nav className="mb-20 flex items-center justify-between py-4 px-8">
            <div className="flex flex-shrink-0 items-center">
                <img src={logo} alt="logo" style={{ width: '60px', height: '40px' }} />
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

                {/* Blog Page Link */}
                <Link to="/blog" className="hover:text-blue-500 transition-colors">
                    <FaBlog />
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