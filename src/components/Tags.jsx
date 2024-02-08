import { useCallback, useContext } from "react";
import { EditorContext } from "../pages/editor";
import { toast } from "react-hot-toast";

const Tags = ({ tag, tagIndex }) => {
   let {
      blog,
      blog: { tags },
      setBlog,
   } = useContext(EditorContext);

   const tagDeleteHandler = useCallback(() => {
      tags = tags.filter((t) => t != tag);
      setBlog({ ...blog, tags });
   }, [tags]);

   const tagEditHandler = (ev) => {
      // Code 13 for Enter Key in keyboard and 188 for comma
      if (ev.keyCode == 13 || ev.keyCode == 188) {
         ev.preventDefault();

         const currentTag = ev.target.innerText;

         if (tags.includes(currentTag)) {
            return toast.error(`${currentTag} tag is exist`);
         }
         if (!currentTag.length) {
            return toast.error("Please add tag value");
         }

         tags[indexedDB] = currentTag;
         setBlog({ ...blog, tag });
         ev.target.setAttribute("contentEditable", false);
      }
   };

   const addEditableHandler = (ev) => {
      const { target } = ev;

      target.setAttribute("contentEditable", true);
      target.focus();
   };

   return (
      <div className="relative py-2 pl-4 pr-10 mt-2 mr-2 shadow bg-white inline-block rounded-full hover:bg-opacity-50">
         <p onKeyDown={tagEditHandler} onClick={addEditableHandler} className="outline-none">
            {tag}
         </p>

         <button onClick={tagDeleteHandler} className="rounded-full absolute right-3 top-1/2 -translate-y-1/2">
            <i className="fi fi-br-cross text-[10px]"></i>
         </button>
      </div>
   );
};

export default Tags;
