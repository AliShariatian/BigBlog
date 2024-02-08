import { createContext, useState } from "react";
import BlogEditor from "../components/BlogEditor";
import PublishForm from "../components/PublishForm";

const blogInitialStructure = {
   title: "",
   banner: "",
   description: "",
   tags: [],
   content: [],
   author: { personal_info: {} },
};

export const EditorContext = createContext({});

const Editor = () => {
   const [blog, setBlog] = useState(blogInitialStructure);
   const [editorState, setEditorState] = useState("EDITOR");
   const [textEditor, setTextEditor] = useState({ isReady: false });

   return (
      <EditorContext.Provider value={{ blog, setBlog, editorState, setEditorState, textEditor, setTextEditor }}>{editorState === "EDITOR" ? <BlogEditor /> : <PublishForm />}</EditorContext.Provider>
   );
};

export default Editor;
