import { Link } from "react-router-dom";

import profile_img from "../imgs/userProfile.jpg";

const NoBannerBlogPostCard = ({ title, index }) => {
   const date = new Date();
   const publishedAt = `${date.getDate()} ${date.toLocaleString("default", { month: "short" })}`;
   const link = title.toLowerCase().replaceAll(" ", "-");

   return (
      <Link to={`/blog/${link}`} title="Read More" className="flex gap-x-5 mb-14">
         <span className="blog-index">0{index + 1}</span>

         <div>
            <div className="flex gap-2 items-center mb-3">
               {/* PROFILE IMAGE */}
               <img src={profile_img} alt="profile image" className="size-6 rounded-full" />
               {/* FULLNAME and USERNAME */}
               <span className="line-clamp-1">Fullname @{"username"}</span>
               {/* PUBLISH TIME */}
               <span className="min-w-fit">{publishedAt}</span>
            </div>

            <h1 className="blog-title">{title}</h1>
         </div>
      </Link>
   );
};

export default NoBannerBlogPostCard;
