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

const BLOG_POSTS_URL = "https://api.slingacademy.com/v1/sample-data/photos?offset=11&limit=100";

const HomePage = () => {
   const [blogs, setBlogs] = useState(null);

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

   return (
      <AnimationWrapper>
         <div className="h-cover flex justify-center gap-10">
            {/* latest blogs */}
            <section className="w-full">
               <InPageNavigation routes={["home", "trending blogs"]} defaultHidden={["trending blogs"]}>
                  <>{blogs === null ? <Loader /> : blogs.map((blog, index) => <BlogPostCard key={blog.id} index={index} {...blog} />)}</>
                  <>{blogs === null ? <Loader /> : blogs.slice(26, 31).map((blog, index) => <NoBannerBlogPostCard key={blog.id} index={index} {...blog} />)}</>
               </InPageNavigation>
            </section>

            {/* filters and trending blogs */}
            <section></section>
         </div>
      </AnimationWrapper>
   );
};

export default HomePage;
