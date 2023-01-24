import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { BiWorld } from "react-icons/bi";

function Footer() {
  return (
    <div className="bg-gray-200 py-4 dark:bg-gray-800 sm:px-16 md:px-32 lg:px-64">
      <div className="container flex items-center justify-between">
        <p>&copy; Copyright &middot; 2023</p>
        <div className="flex items-center gap-2">
          <p className="hidden sm:inline-block">Connect Me!</p>
          <a href="https://www.linkedin.com/in/rohitkmmrr/" target="_blank">
            <AiFillLinkedin size={25} />
          </a>
          <a href="https://www.github.com/rollychop" target="_blank">
            <AiFillGithub size={25} />
          </a>
          <a href="https://www.brohit.com" target="_blank">
            <BiWorld size={25} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
