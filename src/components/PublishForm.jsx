import { useContext } from "react";
import AnimationWrapper from "../common/AnimationWrapper";
import { EditorContext } from "../pages/editor";
import { toast } from "react-hot-toast";
import Tags from "./Tags";

const DESCRIPTION_CHARACTER_LIMIT = 200;
const TAG_LENGTH_LIMIT = 10;

const PublishForm = () => {
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

   return (
      <AnimationWrapper>
         <section className="w-screen min-h-screen grid items-center lg:grid-cols-2 lg:gap-4 py-16">
            <button onClick={() => setEditorState("EDITOR")} className="size-12 absolute right-[5vw] top-[5%] lg:top-[10%] z-10">
               <i className="fi fi-br-cross"></i>
            </button>

            <div className="max-w-[550px] center">
               <p className="text-dark-gray mb-1">Preview</p>
               <div className="w-full aspect-video rounded-lg overflow-hidden bg-grey mt-4">
                  <img src={banner} alt="banner" />
               </div>

               <h1 className="text-4xl font-medium mt-2 leading-tight truncate">{title}</h1>

               <p className="font-secondary min-h-7 line-clamp-2 text-wrap leading-7 mt-4">{description}</p>
            </div>

            <div className="border-grey lg:border-1 lg:pl-8">
               <p className="text-dark-gray mb-2 mt-9">Blog Title</p>
               <input onChange={blogTitleChangeHandler} type="text" placeholder="Blog Title" defaultValue={title} className="input-box pl-4" />

               <p className="text-dark-gray mb-2 mt-9">Short description about your blog</p>
               <textarea
                  onKeyDown={descriptionKeyDownHandler}
                  onChange={blogDescriptionChangeHandler}
                  maxLength={DESCRIPTION_CHARACTER_LIMIT}
                  type="text"
                  placeholder="Blog Description"
                  defaultValue={description}
                  className="input-box h-40 resize-none leading-7 pl-4"
               ></textarea>

               <span className="mt-1 text-dark-gray text-sm text-right block">{`${DESCRIPTION_CHARACTER_LIMIT - description.length} / ${DESCRIPTION_CHARACTER_LIMIT}  Characters left`}</span>

               <p className="text-dark-gray mb-2 mt-9">Topics - ( Helps is searching and ranking your blog post )</p>

               <div className="relative input-box pl-2 pt-2 pb-4">
                  <input type="text" placeholder="Topic" className="sticky input-box bg-white top-0 left-0 pl-4 mb-3 focus-within:bg-white" onKeyDown={tagKeyDownHandler} />

                  {tags.map((tag, index) => {
                     return <Tags key={index} tagIndex={index} tag={tag} />;
                  })}
               </div>
               <span className="mt-1 text-dark-gray text-sm text-right block">{`${TAG_LENGTH_LIMIT - tags.length} / ${TAG_LENGTH_LIMIT}  Tags left`}</span>
            </div>
         </section>
      </AnimationWrapper>
   );
};

export default PublishForm;
