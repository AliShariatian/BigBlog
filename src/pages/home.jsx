import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

// COMPONENTS IMPORT
import AnimationWrapper from "../common/AnimationWrapper";
import InPageNavigation from "../components/InPageNavigation";
import Loader from "../components/Loader";

// BLOG POST CARD COMPONENTS
import BlogPostCard from "../components/BlogPostCard";
import NoBannerBlogPostCard from "../components/NoBannerBlogPostCard";

import { categories } from "../utils/blogCategories";
import { activeTabLineRef, activeTabRef } from "../components/InPageNavigation";

const BLOG_POSTS_URL = "https://api.slingacademy.com/v1/sample-data/photos?offset=11&limit=100";

const HomePage = () => {
   const [blogs, setBlogs] = useState(null);
   const [pageState, setPageState] = useState("home");

   // fetch Data
   const fetchBlogPosts = () => {
      axios
         .get(BLOG_POSTS_URL)
         .then(({ data }) => {
            setBlogs(data.photos);
         })
         .catch(() => {
            toast.error("Failed to get posts!, Please try again");
         });
   };

   useEffect(() => {
      fetchBlogPosts();
   }, []);

   // onClick
   useEffect(() => {
      activeTabRef.current.click();
   }, [pageState]);

   // onClick
   const loadBlogPostByCategory = (ev) => {
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
                  <>{blogs === null ? <Loader /> : blogs.map((blog, index) => <BlogPostCard key={blog.id} index={index} {...blog} />)}</>
                  <>{blogs === null ? <Loader /> : blogs.slice(26, 31).map((blog, index) => <NoBannerBlogPostCard key={blog.id} index={index} {...blog} />)}</>
               </InPageNavigation>
            </section>

            {/* filters and trending blogs */}
            <section className="min-w-[40%] lg:min-w-[500px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden">
               <div className="flex flex-col gap-10">
                  <div>
                     <h3 className="font-medium text-xl mb-8">Stories from all interests</h3>
                     <div className="flex gap-3 flex-wrap">
                        {categories.map((category) => (
                           <button onClick={loadBlogPostByCategory} className={`tag ${pageState === category ? "bg-black text-white" : ""}`}>
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

                     {blogs === null ? <Loader /> : blogs.slice(26, 31).map((blog, index) => <NoBannerBlogPostCard key={blog.id} index={index} {...blog} />)}
                  </div>
               </div>
            </section>
         </div>
      </AnimationWrapper>
   );
};

export default HomePage;
