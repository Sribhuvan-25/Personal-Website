import logo from "../assets/nameLogo.png"
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const Navbar = () => {
    return (
        <nav className="mb-20 flex items-center justify-between py-4 px-8">
            <div className="flex flex-shrink-0 items-center">
                <img src={logo} alt="logo" style={{ width: '60px', height: '40px' }} />
            </div>
            <div className="flex items-center justify-end gap-4 text-2xl">
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