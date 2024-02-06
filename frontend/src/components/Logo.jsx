import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";

const Logo = ({ href = "/" }) => {
   return (
      <Link to={href} className="flex-none size-11">
         <img src={logo} alt="logo" className="size-full" />
      </Link>
   );
};

export default Logo;
