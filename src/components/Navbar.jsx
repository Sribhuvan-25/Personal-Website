import logo from "../assets/nameLogo.png"
import { FaLinkedin, FaGithub,  } from 'react-icons/fa';
import resume from "../assets/resume.pdf";
import { IoDocumentTextOutline } from "react-icons/io5";


const Navbar = () => {
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
            </div>
        </nav>
    );
};

export default Navbar; 