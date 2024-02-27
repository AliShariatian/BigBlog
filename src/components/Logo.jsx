import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";

const Logo = ({ href = "/" }) => {
   return (
      <Link to={href} className="size-11 flex-none">
         <img src={logo} alt="logo" className="size-full" />
      </Link>
   );
};

export default Logo;
