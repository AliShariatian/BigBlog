import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AnimationWrapper from "../common/AnimationWrapper";
import { EditorContext } from "../pages/editor";
import { toast } from "react-hot-toast";
import Tags from "./Tags";

const DESCRIPTION_CHARACTER_LIMIT = 200;
const TAG_LENGTH_LIMIT = 10;

const PublishForm = () => {
   const navigate = useNavigate();

   const {
      blog,
      blog: { title, banner, description, tags, content },
      setBlog,
      textEditor,
      setTextEditor,
      setEditorState,
   } = useContext(EditorContext);

   const blogTitleChangeHandler = (ev) => {
      const { target } = ev;
      setBlog({ ...blog, title: target.value });
   };

   const blogDescriptionChangeHandler = (ev) => {
      const { target } = ev;
      setBlog({ ...blog, description: target.value });
   };

   const descriptionKeyDownHandler = (ev) => {
      // Code 13 for Enter Key in keyboard
      if (ev.keyCode == 13) {
         ev.preventDefault();
      }
   };

   const tagKeyDownHandler = (ev) => {
      // Code 13 for Enter Key in keyboard and 188 for comma
      if (ev.keyCode == 13 || ev.keyCode == 188) {
         ev.preventDefault();

         const newTag = ev.target.value;

         if (tags.length < TAG_LENGTH_LIMIT) {
            if (!tags.includes(newTag) && newTag.length) {
               setBlog({ ...blog, tags: [...tags, newTag] });
               ev.target.value = "";
            }
         } else {
            return toast.error(`You can add max ${TAG_LENGTH_LIMIT} tags`);
         }
      }
   };

   // onClick
   const publishBlogHandler = () => {
      if (!title.length) {
         return toast.error("Write blog title before publish it");
      }

      if (!description.length) {
         return toast.error("Write blog description before publish it");
      }

      if (!tags.length) {
         return toast.error("Add blog tag before publish it");
      }

      //TODO: SAVE DATA TO LOCAL_STORAGE
      navigate("/");
      return toast.success("Publish successfully");
   };

   return (
      <AnimationWrapper>
         <section className="grid min-h-screen w-screen items-center py-16 lg:grid-cols-2 lg:gap-4">
            <button onClick={() => setEditorState("EDITOR")} className="absolute right-[5vw] top-[5%] z-10 size-12 lg:top-[10%]">
               <i className="fi fi-br-cross"></i>
            </button>

            <div className="center max-w-[550px]">
               <p className="mb-1 text-dark-gray">Preview</p>
               <div className="mt-4 aspect-video w-full overflow-hidden rounded-lg bg-grey">
                  <img src={banner} alt="banner" />
               </div>

               <h1 className="mt-2 min-h-14 max-w-[450px] truncate text-4xl font-medium leading-tight lg:max-w-[320px] xl:max-w-[450px]">{title}</h1>

               <p className="mt-4 line-clamp-2 min-h-7 max-w-[450px] break-words font-secondary leading-7 lg:max-w-[320px] xl:max-w-[450px]">{description}</p>
            </div>

            <div className="border-grey lg:border-1 lg:pl-8">
               <p className="mb-2 mt-9 text-dark-gray">Blog Title</p>
               <input onChange={blogTitleChangeHandler} type="text" placeholder="Blog Title" defaultValue={title} className="input-box pl-4" />

               <p className="mb-2 mt-9 text-dark-gray">Short description about your blog</p>
               <textarea
                  onKeyDown={descriptionKeyDownHandler}
                  onChange={blogDescriptionChangeHandler}
                  maxLength={DESCRIPTION_CHARACTER_LIMIT}
                  type="text"
                  placeholder="Blog Description"
                  defaultValue={description}
                  className="input-box h-40 resize-none pl-4 leading-7"
               ></textarea>

               <span className="mt-1 block text-right text-sm text-dark-gray">{`${DESCRIPTION_CHARACTER_LIMIT - description.length} / ${DESCRIPTION_CHARACTER_LIMIT}  Characters left`}</span>

               <p className="mb-2 mt-9 text-dark-gray">Topics - ( Helps is searching and ranking your blog post )</p>

               <div className="input-box relative pb-4 pl-2 pt-2">
                  <input
                     type="text"
                     placeholder="Topic"
                     className="input-box sticky left-0 top-0 mb-3 bg-white pl-4 focus-within:bg-white"
                     onKeyDown={tagKeyDownHandler}
                  />

                  {tags.map((tag, index) => {
                     return <Tags key={index} tagIndex={index} tag={tag} />;
                  })}
               </div>
               <span className="mt-1 block text-right text-sm text-dark-gray">{`${TAG_LENGTH_LIMIT - tags.length} / ${TAG_LENGTH_LIMIT}  Tags left`}</span>

               <button onClick={publishBlogHandler} className="btn-dark px-8">
                  Publish
               </button>
            </div>
         </section>
      </AnimationWrapper>
   );
};

export default PublishForm;
