import { memo } from "react";
import { Link } from "react-router-dom";

import profile_img from "../imgs/userProfile.jpg";
import { shortDate } from "../utils/shortDate";

const NoBannerBlogPostCard = memo(({ title, index, date, fullname }) => {
   const publishedAt = shortDate(date);
   const link = title.toLowerCase().replaceAll(" ", "-");
   const username = fullname.replaceAll(" ", "").toLowerCase();

   return (
      <Link to={`/blog/${link}`} title="Read More" className="mb-14 flex gap-x-5">
         <span className="blog-index">0{index + 1}</span>

         <div>
            <div className="mb-3 flex items-center gap-2">
               {/* PROFILE IMAGE */}
               <img src={profile_img} alt="profile image" className="size-6 rounded-full" />
               {/* FULLNAME and USERNAME */}
               <span className="line-clamp-1 max-w-min">
                  {fullname} @{username}
               </span>
               {/* PUBLISH TIME */}
               <span className="ml-1 min-w-fit">{publishedAt}</span>
            </div>

            <h1 className="blog-title">{title}</h1>
         </div>
      </Link>
   );
});

export default NoBannerBlogPostCard;
