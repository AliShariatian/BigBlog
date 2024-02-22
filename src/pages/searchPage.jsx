import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import InPageNavigation, { activeTabRef } from "../components/InPageNavigation";
import AnimationWrapper from "../common/AnimationWrapper";
import Loader from "../components/Loader";
import BlogPostCard from "../components/BlogPostCard";
import NoDataMessage from "../components/NoDataMessage";

const SearchPage = () => {
   const { query } = useParams();
   const [blogs, setBlogs] = useState(null);

   useEffect(() => {
      activeTabRef.current.click();
   }, [query]);

   return (
      <AnimationWrapper>
         <div className="h-cover flex justify-center gap-0">
            <section className="w-full">
               <InPageNavigation routes={[`Search result for "${query}"`, "Account Matched"]} defaultHidden={["Account Matched"]}>
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
                        </>
                     ) : (
                        <NoDataMessage message="No blogs published!" />
                     )}
                  </>
               </InPageNavigation>
            </section>
         </div>
      </AnimationWrapper>
   );
};

export default SearchPage;
