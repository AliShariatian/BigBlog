import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { sample, random, slice } from "lodash";

// COMPONENTS IMPORT
import AnimationWrapper from "../common/AnimationWrapper";
import InPageNavigation from "../components/InPageNavigation";
import Loader from "../components/Loader";

// BLOG POST CARD COMPONENTS
import BlogPostCard from "../components/BlogPostCard";
import NoBannerBlogPostCard from "../components/NoBannerBlogPostCard";

import { categories, fullname } from "../utils/blogNewData";
import { activeTabRef } from "../components/InPageNavigation";
import NoDataMessage from "../components/NoDataMessage";
import LoadMorePostBtn from "../components/LoadMorePostBtn";

const BLOG_POSTS_URL = "https://api.slingacademy.com/v1/sample-data/photos?offset=11&limit=100";
const BLOGS_COUNT_PER_PAGE = 10;

const HomePage = () => {
   const [blogs, setBlogs] = useState(null);
   const [pageState, setPageState] = useState("home");

   // For load more blogs
   const [isCompleted, setIsCompleted] = useState(false);
   const [index, setIndex] = useState(BLOGS_COUNT_PER_PAGE);
   const slicedBlogs = slice(blogs, 0, index);

   // fetch Data
   const fetchBlogPosts = () => {
      axios
         .get(BLOG_POSTS_URL)
         .then(({ data }) => {
            // Add custom values to data
            const customData = data.photos.map((d) => {
               d.tag = sample(categories);
               d.fullname = sample(fullname);
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

   // onClick
   const showMoreBlogsBtnHandler = () => {
      setIndex(index + BLOGS_COUNT_PER_PAGE);
      if (index >= blogs.length) {
         setIsCompleted(true);
      } else {
         setIsCompleted(false);
      }
   };

   // onClick
   useEffect(() => {
      activeTabRef.current.click();
   }, [pageState]);

   // onClick
   const showBlogPostsByCategory = (ev) => {
      const category = ev.target.innerText.toLowerCase();
      // if click again on a category, reset it
      if (pageState === category) {
         return setPageState("home");
      }
      setPageState(category);
   };

   return (
      <AnimationWrapper>
         <div className="h-cover flex justify-center gap-0">
            {/* latest blogs */}
            <section className="w-full">
               <InPageNavigation routes={[pageState, "trending blogs"]} defaultHidden={["trending blogs"]}>
                  {/* All blogs */}
                  <>
                     {blogs === null ? (
                        <Loader />
                     ) : blogs.length ? (
                        <>
                           {slicedBlogs
                              .filter((blog) => {
                                 if (pageState === "home") {
                                    return blog;
                                 }
                                 return blog.tag === pageState;
                              })
                              .map((blog, index) => (
                                 <BlogPostCard key={blog.id} index={index} {...blog} />
                              ))}

                           {isCompleted ? "Posts Finished" : <LoadMorePostBtn onClick={showMoreBlogsBtnHandler} />}
                        </>
                     ) : (
                        <NoDataMessage message="No blogs published!" />
                     )}

                     {/* Load more posts button */}
                  </>

                  {/* Trending blogs in mobile view */}
                  <>
                     {blogs === null ? (
                        <Loader />
                     ) : blogs.length ? (
                        blogs.slice(26, 31).map((blog, index) => <NoBannerBlogPostCard key={blog.id} index={index} {...blog} />)
                     ) : (
                        <NoDataMessage message="No trending blogs!" />
                     )}
                  </>
               </InPageNavigation>
            </section>

            {/* filters and trending blogs */}
            <section className="min-w-[40%] lg:min-w-[500px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden">
               <div className="flex flex-col gap-10">
                  <div>
                     <h3 className="font-medium text-xl mb-8">Stories from all interests</h3>
                     <div className="flex gap-3 flex-wrap">
                        {categories.map((category) => (
                           <button onClick={showBlogPostsByCategory} key={category} className={`tag ${pageState === category ? "bg-black text-white" : ""}`}>
                              {category}
                           </button>
                        ))}
                     </div>
                  </div>

                  <div>
                     <h2 className="font-medium text-xl mb-8 flex gap-2 items-end">
                        Trending
                        <i className="fi fi-rr-arrow-trend-up"></i>
                     </h2>

                     {/* Trending blogs in desktop view */}
                     {blogs === null ? (
                        <Loader />
                     ) : blogs.length ? (
                        blogs.slice(26, 31).map((blog, index) => <NoBannerBlogPostCard key={blog.id} index={index} {...blog} />)
                     ) : (
                        <NoDataMessage message="No trending blogs!" />
                     )}
                  </div>
               </div>
            </section>
         </div>
      </AnimationWrapper>
   );
};

export default HomePage;
