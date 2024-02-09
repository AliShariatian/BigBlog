import EditorJS from "@editorjs/editorjs";
import { useContext, useEffect } from "react";
import { toast } from "react-hot-toast";
import AnimationWrapper from "../common/AnimationWrapper";
import { EditorContext } from "../pages/editor";
import Logo from "./Logo";
import { tools } from "./Tools";

const BANNER_IMG_MAX_FILE_SIZE_LIMIT = 5_000_000; // ~5Mb

const BlogEditor = () => {
   const {
      blog,
      blog: { title, banner, description, tags, content },
      setBlog,
      textEditor,
      setTextEditor,
      setEditorState,
   } = useContext(EditorContext);

   useEffect(() => {
      setTextEditor(
         new EditorJS({
            holderId: "textEditor",
            data: content,
            tools: tools,
            placeholder: "Let's write an awesome story",
         })
      );
   }, []);

   const uploadBannerHandler = (ev) => {
      if (ev.target.files.length > 1) {
         return toast.error("Please select 1 file for banner!");
      }

      const IMG_BANNER_FILE = ev.target.files[0];

      if (IMG_BANNER_FILE.size > BANNER_IMG_MAX_FILE_SIZE_LIMIT) {
         return toast.error("Max banner size limit is 5Mb!");
      }

      // Loading when banner uploading
      const loading = toast.loading("Please wait...");

      // Set image to view
      if (IMG_BANNER_FILE) {
         const imgObjectURL = URL.createObjectURL(IMG_BANNER_FILE);

         setBlog({ ...blog, banner: imgObjectURL });

         toast.dismiss(loading);
         return toast.success("Upload successfully");
      }
   };

   const titleKeyDownHandler = (ev) => {
      // Code 13 for Enter Key in keyboard
      if (ev.keyCode == 13) {
         ev.preventDefault();
      }
   };

   const titleChangeHandler = (ev) => {
      const { target } = ev;

      // Dynamic text area height
      target.style.height = "auto"; // For reset when remove text
      target.style.height = `${target.scrollHeight}px`; // For set text area height

      setBlog({ ...blog, title: target.value });
   };

   const publishEventHandler = () => {
      if (!banner.length) {
         return toast.error("Upload blog banner to publish it.");
      }

      if (!title.length) {
         return toast.error("Write blog title to publish it.");
      }

      if (textEditor.isReady) {
         textEditor
            .save()
            .then((data) => {
               if (data.blocks.length) {
                  setBlog({ ...blog, content: data });
                  setEditorState("PUBLISH");
               } else {
                  return toast.error("Write something in your blog to publish it");
               }
            })
            .catch((err) => {
               console.log(err);
            });
      }
   };

   return (
      <>
         <nav className="navbar z-30">
            <Logo />

            <p className="max-md:hidden text-black line-clamp-1 w-full">{title.length ? title : "New Blog"}</p>

            <div className="flex gap-4 ml-auto *:py-2">
               <button onClick={publishEventHandler} className="btn-dark">
                  Publish
               </button>
               <button className="btn-light">Save Draft</button>
            </div>
         </nav>

         {/* blog editor banner */}
         <AnimationWrapper>
            <section>
               <div className="mx-auto w-full max-w-[900px]">
                  <div className="relative">
                     {!!banner.length && (
                        <i
                           onClick={() => setBlog({ ...blog, banner: "" })}
                           title="Remove banner"
                           class="fi fi-rr-cross-small bg-gray-100/90 hover:bg-gray-50 peer/bannerOpacity absolute left-5 top-3 text-xl size-6 hover:shadow-md flex items-center justify-center text-black rounded-full cursor-pointer z-20"
                        ></i>
                     )}
                     <div className="relative aspect-video bg-white border-4 border-dashed rounded border-grey peer-hover/bannerOpacity:opacity-100 hover:opacity-70">
                        <label htmlFor="uploadBanner">
                           <div className="size-full">
                              {banner.length ? (
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
                  <textarea
                     defaultValue={title}
                     onKeyDown={titleKeyDownHandler}
                     onChange={titleChangeHandler}
                     placeholder="Blog Title"
                     className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40"
                  ></textarea>

                  <hr className="w-full opacity-70 my-5" />

                  <div id="textEditor" className="font-secondary"></div>
               </div>
            </section>
         </AnimationWrapper>
      </>
   );
};

export default BlogEditor;
