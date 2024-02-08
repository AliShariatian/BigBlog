import { useState } from "react";
import { toast } from "react-hot-toast";
import AnimationWrapper from "../common/AnimationWrapper";
import Logo from "./Logo";

const BANNER_IMG_MAX_FILE_SIZE_LIMIT = 5_000_000; // ~5Mb

const BlogEditor = () => {
   const [banner, setBanner] = useState(null);

   const uploadBannerHandler = (ev) => {
      if (ev.target.files.length > 1) {
         return toast.error("Please select 1 file for banner!");
      }

      const IMG_BANNER_FILE = ev.target.files[0];

      if (IMG_BANNER_FILE.size > BANNER_IMG_MAX_FILE_SIZE_LIMIT) {
         return toast.error("Max banner size limit is 5Mb!");
      }

      // Set image to view
      if (IMG_BANNER_FILE) {
         const img = URL.createObjectURL(IMG_BANNER_FILE);
         setBanner(img);
      }
   };

   return (
      <>
         <nav className="navbar">
            <Logo />

            <p className="max-md:hidden text-black line-clamp-1 w-full">New Blog</p>

            <div className="flex gap-4 ml-auto *:py-2">
               <button className="btn-dark">Publish</button>
               <button className="btn-light">Save Draft</button>
            </div>
         </nav>

         {/* blog editor banner */}
         <AnimationWrapper>
            <section>
               <div className="mx-auto w-full max-w-[900px]">
                  <div className="relative">
                     {banner && (
                        <i
                           onClick={() => setBanner(null)}
                           title="Remove banner"
                           class="fi fi-rr-cross-small bg-gray-100/90 hover:bg-gray-50 peer/bannerOpacity absolute left-5 top-3 text-xl size-6 hover:shadow-md flex items-center justify-center text-black rounded-full cursor-pointer z-50"
                        ></i>
                     )}
                     <div className="relative aspect-video bg-white border-4 border-dashed rounded border-grey peer-hover/bannerOpacity:opacity-100 hover:opacity-70">
                        <label htmlFor="uploadBanner">
                           <div className="size-full">
                              {banner ? (
                                 <img src={banner} alt="blog banner" title="Click to change banner" className="z-20 object-contain" />
                              ) : (
                                 <span title="Click to add banner" className="size-full flex items-center justify-center text-4xl text-gray-300">
                                    Blog Banner
                                 </span>
                              )}
                              <input hidden onChange={uploadBannerHandler} type="file" id="uploadBanner" accept=".png, .jpg, .jpeg" />
                           </div>
                        </label>
                     </div>
                  </div>
               </div>
            </section>
         </AnimationWrapper>
      </>
   );
};

export default BlogEditor;
