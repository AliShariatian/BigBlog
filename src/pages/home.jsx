import { useEffect, useState } from "react";
import axios from "axios";

import AnimationWrapper from "../common/AnimationWrapper";
import InPageNavigation from "../components/InPageNavigation";
import { toast } from "react-hot-toast";
import Loader from "../components/Loader";
import BlogPostCard from "../components/BlogPostCard";

const BLOG_POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const HomePage = () => {
   const [blogs, setBlogs] = useState(null);

   const fetchBlogs = () => {
      axios
         .get(BLOG_POSTS_URL)
         .then(({ data }) => {
            setBlogs(data);
         })
         .catch(() => {
            toast.error("Failed to get posts!, Please try again");
         });
   };

   useEffect(() => {
      fetchBlogs();
   }, []);

   return (
      <AnimationWrapper>
         <div className="h-cover flex justify-center gap-10">
            {/* latest blogs */}
            <section className="w-full">
               <InPageNavigation routes={["home", "trending blogs"]} defaultHidden={["trending blogs"]}>
                  <>{blogs === null ? <Loader /> : blogs.map((blog, index) => <BlogPostCard key={blog.id} index={index} blog={blog} />)}</>
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
