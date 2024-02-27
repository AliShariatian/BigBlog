import { memo } from "react";
import { Link } from "react-router-dom";

import AnimationWrapper from "../common/AnimationWrapper";
import profile_img from "../imgs/userProfile.jpg";
import { shortDate } from "../utils/shortDate";

const BlogPostCard = memo(({ title, description, url, tag, date, fullname, like_count, index }) => {
   const publishedAt = shortDate(date);
   const link = title.toLowerCase().replaceAll(" ", "-");
   const username = fullname.replaceAll(" ", "").toLowerCase();

   return (
      <AnimationWrapper transition={{ duration: 1, delay: index * 0.1 }}>
         <div className="mb-7 flex items-center gap-8 border-b border-grey pb-7">
            <div className="w-full">
               <div className="mb-4 flex items-center gap-2">
                  {/* PROFILE IMAGE */}
                  <img src={profile_img} alt="profile image" className="size-6 rounded-full" />

                  {/* FULLNAME and USERNAME */}
                  <Link to={`/user/${username}`} title={fullname}>
                     <span className="line-clamp-1">
                        {fullname} @{username}
                     </span>
                  </Link>

                  {/* PUBLISH TIME */}
                  <span className="ml-1 min-w-fit">{publishedAt}</span>
               </div>

               {/* TITLE */}
               <Link to={`/blog/${link}`} title="Read More">
                  <h1 className="blog-title">{title}</h1>
               </Link>

               {/* DESCRIPTION */}
               <Link to={`/blog/${link}`} title="Read More">
                  <p className="my-3 line-clamp-2 font-secondary text-xl leading-7 max-sm:hidden md:max-[1100px]:hidden">{description}</p>
               </Link>

               <div className="mt-7 flex gap-4">
                  {/* TAG */}
                  <span className="btn-light px-4 py-1 text-base">{tag}</span>

                  <span className="ml-3 flex items-center gap-2 text-dark-gray">
                     <i className="fi fi-rr-heart text-xl"></i>
                     {/* TOTAL SINGLE POST LIKE COUNT */}
                     {like_count}
                  </span>
               </div>
            </div>

            {/* BLOG IMAGE */}
            <Link to={`/blog/${link}`} title="Read More">
               <div className="aspect-square h-28 bg-grey">
                  <img src={url} alt="post image" className="aspect-square size-full rounded object-cover" />
               </div>
            </Link>
         </div>
      </AnimationWrapper>
   );
});

export default BlogPostCard;
