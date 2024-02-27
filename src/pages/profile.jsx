import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { categories, fullname } from "../utils/blogNewData";
import profile_img from "../imgs/userProfile.jpg";
import { random, sample } from "lodash";
import { toast } from "react-hot-toast";

import About from "../components/About";
import Loader from "../components/Loader";
import AnimationWrapper from "../common/AnimationWrapper";
import InPageNavigation from "../components/InPageNavigation";
import BlogPostCard from "../components/BlogPostCard";
import NoDataMessage from "../components/NoDataMessage";
import Page404 from "../pages/404";

const BLOG_POSTS_URL = `https://api.slingacademy.com/v1/sample-data/photos?offset=${random(0, 10)}&limit=${random(0, 15)}`;

const ProfilePage = () => {
   const [blogs, setBlogs] = useState(null);

   const { username } = useParams();
   const currentUserFullName = fullname.find((item) => item.replaceAll(" ", "").toLowerCase() === username);

   const fetchBlogPosts = () => {
      axios
         .get(BLOG_POSTS_URL)
         .then(({ data }) => {
            // Add custom values to data
            const customData = data.photos.map((d) => {
               d.tag = sample(categories);
               d.fullname = currentUserFullName;
               d.date = new Date(new Date() - Math.random() * 1e12);
               d.like_count = random(0, 50);

               return d;
            });

            setBlogs(customData);
         })
         .catch(() => {
            toast.error("Failed to get posts!, Please try again");
         });
   };

   useEffect(() => {
      fetchBlogPosts();
   }, []);

   const totalPosts = random(0, 90);
   const totalReads = random(0, 5000);

   return (
      <AnimationWrapper>
         {currentUserFullName ? (
            <section className="h-cover flex-row-reverse items-start gap-5 md:flex min-[1100px]:gap-12">
               <div className="flex min-w-[250px] flex-col gap-5 border-grey max-md:items-center md:sticky md:top-[100px] md:w-1/2 md:border-l md:py-10 md:pl-8">
                  {/* Profile image */}
                  <img src={profile_img} alt={currentUserFullName} className="size-48 rounded-full bg-grey md:size-32" />
                  <span className="text-2xl font-medium">@{username}</span>
                  <h1 className="h-6 text-xl capitalize">{currentUserFullName}</h1>
                  <p>
                     {totalPosts.toLocaleString()} Blogs - {totalReads.toLocaleString()} Reads
                  </p>
                  <div className="mt-2 flex gap-4">
                     <Link to="/settings/edit-profile" className="btn-light rounded-md">
                        Edit Profile
                     </Link>
                  </div>

                  <About className="max-md:hidden" />
               </div>

               <div className="w-full max-md:mt-12">
                  <InPageNavigation routes={["Blogs Published", "About"]} defaultHidden={["About"]}>
                     {/* All blogs */}
                     <>
                        {blogs === null ? (
                           <Loader />
                        ) : blogs.length ? (
                           <>
                              {blogs.map((blog, index) => (
                                 <BlogPostCard key={blog.id} index={index} {...blog} />
                              ))}
                           </>
                        ) : (
                           <NoDataMessage message="No blogs published!" />
                        )}
                     </>

                     {/*  */}
                     <>
                        <About className="mb-16" />
                     </>
                  </InPageNavigation>
               </div>
            </section>
         ) : (
            <Page404 />
         )}
      </AnimationWrapper>
   );
};

export default ProfilePage;
