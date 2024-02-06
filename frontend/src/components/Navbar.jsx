import { useContext, useState } from "react";
import { UserContext } from "../App";

// components import
import { Link } from "react-router-dom";
import UserNavigationPanel from "./UserNavigationPanel";
import Logo from "./Logo";

const Navbar = () => {
   const {
      userAuth: { access_token, profile_img, fullName },
   } = useContext(UserContext);

   // open/close UserNavigationPanel handling
   const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);
   const [userNavigationPanelVisibility, setUserNavigationPanelVisibility] = useState(false);

   const userNavPanelClickHandler = () => {
      setUserNavigationPanelVisibility(!userNavigationPanelVisibility);
   };

   const userNavPanelBlurHandler = () => {
      setTimeout(() => {
         setUserNavigationPanelVisibility(false);
      }, 99);
   };

   return (
      <nav className="navbar">
         <Logo />

         {/* search bar */}
         <div
            className={`absolute left-0 top-full bg-white w-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show ${
               searchBoxVisibility ? "show" : "hide"
            }`}
         >
            <input type="text" placeholder="Search" className="w-full md:w-auto bg-grey py-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-gray md:pl-12" />
            <i className="fi fi-rr-search absolute right-[10%] md:left-5 top-1/2 -translate-y-1/2 md:pointer-events-none text-xl text-dark-gray"></i>
         </div>

         {/* navbar links */}
         <div className="flex items-center gap-3 md:gap-6 ml-auto">
            {/* search bar icon for open search bar */}
            <button onClick={() => setSearchBoxVisibility(!searchBoxVisibility)} className="md:hidden bg-grey size-12 rounded-full flex items-center justify-center">
               <i className="fi fi-rr-search text-xl"></i>
            </button>

            <Link to="/editor" className="hidden md:flex gap-2 link px-6">
               <i className="fi fi-rr-file-edit"></i>
               <span>Write</span>
            </Link>

            {access_token ? (
               <>
                  <Link to="/dashboard/notification">
                     <button className="size-12 rounded-full bg-grey hover:bg-black/10 relative">
                        <i className="fi fi-rr-bell text-2xl block mt-1"></i>
                     </button>
                  </Link>

                  <div onClick={userNavPanelClickHandler} onBlur={userNavPanelBlurHandler} className="relative">
                     <button className="size-12 mt-1">
                        <img src={profile_img} alt={fullName} className="size-full object-cover rounded-full" />
                     </button>

                     {/* user menu */}
                     {userNavigationPanelVisibility ? <UserNavigationPanel /> : null}
                  </div>
               </>
            ) : (
               <>
                  <Link to="/signin" className="btn-dark py-2">
                     Sign In
                  </Link>
                  <Link to="/signup" className="btn-light py-2 hidden md:block">
                     Sign Up
                  </Link>
               </>
            )}
         </div>
      </nav>
   );
};

export default Navbar;
