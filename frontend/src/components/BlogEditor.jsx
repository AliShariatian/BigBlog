import AnimationWrapper from "../common/AnimationWrapper";
// import { uploadImage } from "../common/aws";
import Logo from "./Logo";
import { toast } from "react-hot-toast";

const BANNER_IMG_MAX_FILE_SIZE_LIMIT = 5_000_000; // 5Mb

const BlogEditor = () => {
   const uploadBannerHandler = (ev) => {
      if (ev.target.files.length > 1) {
         return toast.error("Please select 1 file for banner!");
      }

      const imgBannerFile = ev.target.files[0];

      if (imgBannerFile.size > BANNER_IMG_MAX_FILE_SIZE_LIMIT) {
         return toast.error("Max banner size limit is 5Mb!");
      }

      // if (imgBannerFile) {
      //    uploadImage(imgBannerFile).then((url) => {
      //       if(url){

      //       }
      //    });
      // }
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
                  <div className="relative aspect-video bg-white border-4 border-dashed border-grey hover:opacity-70">
                     <label htmlFor="uploadBanner">
                        <div className="size-full z-0">
                           <input hidden onChange={uploadBannerHandler} type="file" id="uploadBanner" accept=".png, .jpg, .jpeg" />
                           <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl text-gray-300">Blog Banner</span>
                        </div>
                     </label>
                  </div>
               </div>
            </section>
         </AnimationWrapper>
      </>
   );
};

export default BlogEditor;
