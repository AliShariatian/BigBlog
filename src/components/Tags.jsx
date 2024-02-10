import { useCallback, useContext } from "react";
import { EditorContext } from "../pages/editor";
import { toast } from "react-hot-toast";

let tagPrevValue = "";

const Tags = ({ tag, tagIndex }) => {
   let {
      blog,
      blog: { tags },
      setBlog,
   } = useContext(EditorContext);

   // onClick
   const tagDeleteHandler = useCallback(() => {
      tags = tags.filter((t) => t != tag);
      setBlog({ ...blog, tags });
   }, [tags]);

   // onKeyDown & onBlur
   const tagEditHandler = (ev) => {

      // Code 13 for Enter Key in keyboard
      if (ev.keyCode == 13) {
         ev.preventDefault();
         ev.target.setAttribute("contentEditable", false);
      }

      // onBlur event
      if (ev.type == "blur") {
         ev.preventDefault();
         
         const currentTag = ev.target.innerText;
         if (currentTag == tagPrevValue) {
            return;
         }

         if (!currentTag.length) {
            ev.target.innerText = tagPrevValue;
            return toast.error("Please write tag value");
         }

         if (tags.includes(currentTag)) {
            ev.target.innerText = tagPrevValue;
            return toast.error(`${currentTag} tag exist`);
         }

         tags[tagIndex] = currentTag;
         setBlog({ ...blog, tag });
         ev.target.setAttribute("contentEditable", false);
      }
   };

   // onClick
   const addEditableHandler = (ev) => {
      const { target } = ev;
      target.setAttribute("contentEditable", true);
      target.focus();
      tagPrevValue = target.innerText;
   };

   return (
      <div className="relative py-2 pl-4 pr-10 mt-2 mr-2 shadow bg-white inline-block rounded-full hover:bg-opacity-50">
         <p onKeyDown={tagEditHandler} onClick={addEditableHandler} onBlur={tagEditHandler} className="outline-none">
            {tag}
         </p>

         <button onClick={tagDeleteHandler} className="rounded-full absolute right-3 top-1/2 -translate-y-1/2">
            <i className="fi fi-br-cross text-[10px]"></i>
         </button>
      </div>
   );
};

export default Tags;
