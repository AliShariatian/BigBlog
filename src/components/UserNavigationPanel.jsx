import { useContext } from "react";
import AnimationWrapper from "../common/AnimationWrapper";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import { removeFromSession } from "../common/session";

const UserNavigationPanel = () => {
   const {
      userAuth: { username },
      setUserAuth,
   } = useContext(UserContext);

   const userSignOutHandler = () => {
      removeFromSession("user");
      setUserAuth({ access_token: null });
   };

   return (
      <AnimationWrapper transition={{ duration: 0.2 }} className="absolute right-0 z-50">
         <div className="bg-white absolute right-0 border border-grey w-60 duration-200 py-2 rounded-lg shadow md:hidden *:rounded-none">
            <Link to="/editor" className="flex gap-3 md:hidden pl-8 py-4 link">
               <i className="fi fi-rr-file-edit"></i>
               <span>Write</span>
            </Link>

            <Link to={`/user/${username}`} className="flex gap-3 pl-8 py-4 link">
               <i class="fi fi-rr-user"></i>
               <span>Profile</span>
            </Link>

            <Link to="/dashboard/blogs" className="flex gap-3 pl-8 py-4 link">
               <i class="fi fi-rr-dashboard"></i>
               <span>Dashboard</span>
            </Link>

            <Link to="/settings/edit-profile" className="flex gap-3 pl-8 py-4 link">
               <i class="fi fi-rr-settings"></i>
               <span>Settings</span>
            </Link>

            <hr className="border-grey my-2" />

            <button onClick={userSignOutHandler} className="flex flex-col p-4 pl-8 text-left hover:bg-grey w-full">
               <span className="font-bold text-xl mb-1">Sign Out</span>
               <span className="text-dark-gray">@{username}</span>
            </button>
         </div>
      </AnimationWrapper>
   );
};

export default UserNavigationPanel;
