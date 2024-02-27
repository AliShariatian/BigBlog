import { useState } from "react";

// COMPONENTS IMPORT
import { Link, Outlet, useNavigate } from "react-router-dom";
import UserNavigationPanel from "./UserNavigationPanel";

// IMAGES
import Logo from "./Logo";
import profile_img from "../imgs/userProfile.jpg";

const Navbar = () => {
   // open/close UserNavigationPanel handling
   const [showSearchBoxVisibility, setShowSearchBox] = useState(false);
   const [showNavPanel, setShowNavPanel] = useState(false);

   const navigate = useNavigate();

   // onClick
   const userNavPanelClickHandler = () => {
      setShowNavPanel(!showNavPanel);
   };

   // onBlur
   const userNavPanelBlurHandler = () => {
      setTimeout(() => {
         setShowNavPanel(false);
      }, 99);
   };

   // onKeyDown
   const searchHandler = (ev) => {
      const query = ev.target.value.trim();

      // keyCode 13 is Enter key
      if (ev.keyCode === 13 && query.length) {
         navigate(`/search/${query}`);
      }
   };

   return (
      <>
         <nav className="navbar">
            <Logo />

            {/* SEARCH BAR */}
            <div
               className={`md:show absolute left-0 top-full mt-0.5 w-full border-b border-grey bg-white px-[5vw] py-4 md:relative md:inset-0 md:block md:w-auto md:border-0 md:p-0 ${
                  showSearchBoxVisibility ? "show" : "hide"
               }`}
            >
               <input
                  onKeyDown={searchHandler}
                  type="search"
                  maxLength={20}
                  placeholder="Search"
                  className="w-full rounded-full bg-grey py-4 pl-6 pr-[12%] placeholder:text-dark-gray md:w-auto md:pl-12 md:pr-6"
               />
               <i className="fi fi-rr-search absolute right-[10%] top-1/2 -translate-y-1/2 text-xl text-dark-gray md:pointer-events-none md:left-5"></i>
            </div>

            {/* NAVBAR LINKS */}
            <div className="ml-auto flex items-center gap-3 md:gap-6">
               {/* Search bar icon for open search bar */}
               <button
                  onClick={() => setShowSearchBox(!showSearchBoxVisibility)}
                  className="flex size-12 items-center justify-center rounded-full bg-grey md:hidden"
               >
                  <i className="fi fi-rr-search text-xl"></i>
               </button>

               <Link to="/editor" className="link hidden gap-2 px-6 md:flex">
                  <i className="fi fi-rr-file-edit"></i>
                  <span>Write</span>
               </Link>

               <>
                  <Link to="/dashboard/notification">
                     <button className="relative size-12 rounded-full bg-grey hover:bg-black/10">
                        <i className="fi fi-rr-bell mt-1 block text-2xl"></i>
                     </button>
                  </Link>

                  <div onClick={userNavPanelClickHandler} onBlur={userNavPanelBlurHandler} className="relative">
                     <button className="mt-1 size-12">
                        <img src={profile_img} alt={"fullName"} className="size-full rounded-full object-cover" />
                     </button>

                     {/* USER MENU */}
                     {showNavPanel ? <UserNavigationPanel /> : null}
                  </div>
               </>

               <>
                  <Link to="/signin" className="btn-dark py-2">
                     Sign In
                  </Link>
                  <Link to="/signup" className="btn-light hidden py-2 md:block">
                     Sign Up
                  </Link>
               </>
            </div>
         </nav>
         <Outlet />
      </>
   );
};

export default Navbar;
