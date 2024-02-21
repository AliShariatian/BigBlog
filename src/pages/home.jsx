import { useEffect, useState } from "react";
import axios from "axios";

import AnimationWrapper from "../common/AnimationWrapper";
import InPageNavigation from "../components/InPageNavigation";
import { toast } from "react-hot-toast";
import Loader from "../components/Loader";
import BlogPostCard from "../components/BlogPostCard";

const BLOG_POSTS_URL = "https://api.slingacademy.com/v1/sample-data/photos?offset=3&limit=100";

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

   console.log(blogs);

   return (
      <AnimationWrapper>
         <div className="h-cover flex justify-center gap-10">
            {/* latest blogs */}
            <section className="w-full">
               <InPageNavigation routes={["home", "trending blogs"]} defaultHidden={["trending blogs"]}>
                  <>{blogs === null ? <Loader /> : blogs.map((blog, index) => <BlogPostCard key={blog.id} index={index} {...blog} />)}</>
                  <>2</>
               </InPageNavigation>
            </section>

            {/* filters and trending blogs */}
            <section></section>
         </div>
      </AnimationWrapper>
   );
};

export default HomePage;
