import logo from "../assets/nameLogo.png"
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { IoDocumentTextOutline } from "react-icons/io5";
import { RiArticleLine } from "react-icons/ri";
import resume from "../assets/resume.pdf";
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="mb-20 flex items-center justify-between py-4 px-8">
            <div className="flex flex-shrink-0 items-center">
                <Link to="/">
                    <img src={logo} alt="logo" style={{ width: '60px', height: '40px' }} />
                </Link>
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
                <a href={resume} target="_blank" rel="noopener noreferrer">
                    <IoDocumentTextOutline />
                </a>

                <a href="https://www.linkedin.com/in/sribhuvanyellu/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin style={{color: 'white'}} />
                </a>
                <a href="https://github.com/Sribhuvan-25" target="_blank" rel="noopener noreferrer">
                    <FaGithub style={{color: 'white'}}/>
                </a>
            </div>
        </nav>
    );
};

export default Navbar; 