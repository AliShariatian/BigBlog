import { memo } from "react";
import { Link } from "react-router-dom";
import { random } from "lodash";

import AnimationWrapper from "../common/AnimationWrapper";
import profile_img from "../imgs/userProfile.jpg";

const BlogPostCard = memo(({ title, description, url, index }) => {
   const date = new Date();
   const publishedAt = `${date.getDate()} ${date.toLocaleString("default", { month: "short" })}`;
   const link = title.toLowerCase().replaceAll(" ", "-");

   const like_count = random(0, 50);

   return (
      <AnimationWrapper transition={{ duration: 1, delay: index * 0.1 }}>
         <Link to={`/blog/${link}`} title="Read More" className="flex gap-8 items-center border-b border-grey pb-5 mb-5">
            <div className="w-full">
               <div className="flex gap-2 items-center mb-7">
                  {/* PROFILE IMAGE */}
                  <img src={profile_img} alt="profile image" className="size-6 rounded-full" />

                  {/* FULLNAME and USERNAME */}
                  <span className="line-clamp-1">Fullname @{"username"}</span>

                  {/* PUBLISH TIME */}
                  <span className="min-w-fit">{publishedAt}</span>
               </div>

               {/* TITLE */}
               <h1 className="blog-title">{title}</h1>

               {/* DESCRIPTION */}
               <p className="my-3 line-clamp-2 text-xl font-secondary leading-7 max-sm:hidden md:max-[1100px]:hidden">{description}</p>

               <div className="flex gap-4 mt-7">
                  {/* TAG */}
                  <span className="btn-light text-base py-1 px-4">Tag</span>

                  <span className="ml-3 flex items-center gap-2 text-dark-gray">
                     <i className="fi fi-rr-heart text-xl"></i>
                     {/* TOTAL SINGLE POST LIKE COUNT */}
                     {like_count}
                  </span>
               </div>
            </div>

            {/* BLOG IMAGE */}
            <div className="h-28 aspect-square bg-grey">
               <img src={url} alt="post image" className="size-full rounded aspect-square object-cover" />
            </div>
         </Link>
      </AnimationWrapper>
   );
});

export default BlogPostCard;
