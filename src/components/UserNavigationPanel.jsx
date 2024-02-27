import AnimationWrapper from "../common/AnimationWrapper";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const UserNavigationPanel = () => {
   const userSignOutHandler = () => {
      return toast.success("You signed out");
   };

   return (
      <AnimationWrapper transition={{ duration: 0.2 }} className="absolute right-0 z-50">
         <div className="absolute right-0 w-60 rounded-lg border border-grey bg-white py-2 shadow duration-200 *:rounded-none">
            <Link to="/editor" className="link flex gap-3 py-4 pl-8 md:hidden">
               <i className="fi fi-rr-file-edit"></i>
               <span>Write</span>
            </Link>

            <Link to={`/user/${"username"}`} className="link flex gap-3 py-4 pl-8">
               <i class="fi fi-rr-user"></i>
               <span>Profile</span>
            </Link>

            <Link to="/dashboard/blogs" className="link flex gap-3 py-4 pl-8">
               <i class="fi fi-rr-dashboard"></i>
               <span>Dashboard</span>
            </Link>

            <Link to="/settings/edit-profile" className="link flex gap-3 py-4 pl-8">
               <i class="fi fi-rr-settings"></i>
               <span>Settings</span>
            </Link>

            <hr className="my-2 border-grey" />

            <button onClick={userSignOutHandler} className="flex w-full flex-col p-4 pl-8 text-left hover:bg-grey">
               <span className="mb-1 text-xl font-bold">Sign Out</span>
               <span className="text-dark-gray">@{"username"}</span>
            </button>
         </div>
      </AnimationWrapper>
   );
};

export default UserNavigationPanel;
