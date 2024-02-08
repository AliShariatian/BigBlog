import { useRef } from "react";
import { toast } from "react-hot-toast";
import AnimationWrapper from "../common/AnimationWrapper";
import axios from "../axios/imageUpload";
import Logo from "./Logo";
import { s3UploadAction } from "../common/liara";

const BANNER_IMG_MAX_FILE_SIZE_LIMIT = 5_000_000; // 5Mb

const BlogEditor = () => {
   const blogBannerImgRef = useRef(null);

   const uploadBannerHandler = async (ev) => {
      if (ev.target.files.length > 1) {
         return toast.error("Please select 1 file for banner!");
      }

      const IMG_BANNER_FILE = ev.target.files[0];

      if (IMG_BANNER_FILE.size > BANNER_IMG_MAX_FILE_SIZE_LIMIT) {
         return toast.error("Max banner size limit is 5Mb!");
      }

      // start upload
      if (IMG_BANNER_FILE) {

         const data = new FormData();
         // data.set('file', e.target.files[0]) as File;
         data.set('file', IMG_BANNER_FILE);
         const result = await s3UploadAction(data);


console.log(result);

         // const loadingToast = toast.loading("Uploading...");

         // axios
         //    .post("/upload-img", { body: data })
         //    .then((data) => {
         //       if (data) {
         //          toast.dismiss(loadingToast);
         //          blogBannerImgRef.current.src = url;

         //          return toast.success("Uploaded");
         //       }
         //    })
         //    .catch((err) => {
         //       toast.dismiss(loadingToast);
         //       return toast.error("Upload failed!");
         //    });
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
                  <div className="relative aspect-video bg-white border-4 border-dashed rounded border-grey hover:opacity-70">
                     <label htmlFor="uploadBanner" className="">
                        <div className="size-full">
                           {blogBannerImgRef.current ? (
                              <img ref={blogBannerImgRef} src="" alt="blog" className="z-20 object-contain" />
                           ) : (
                              <span className="text-4xl text-gray-300 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">Blog Banner</span>
                           )}
                           <input hidden onChange={uploadBannerHandler} type="file" id="uploadBanner" accept=".png, .jpg, .jpeg" />
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
