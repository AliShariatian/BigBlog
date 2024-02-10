import { createContext, useState } from "react";
import BlogEditor from "../components/BlogEditor";
import PublishForm from "../components/PublishForm";

const initialState = {
   blog: {
      title: "",
      banner: "",
      description: "",
      tags: [],
      content: [],
      author: { personal_info: {} },
   },
   editorState: "EDITOR",
   textEditor: { isReady: false },
};

export const EditorContext = createContext({});

const Editor = () => {
   const [blog, setBlog] = useState(initialState.blog);
   const [editorState, setEditorState] = useState(initialState.editorState);
   const [textEditor, setTextEditor] = useState(initialState.textEditor);

   return (
      <EditorContext.Provider value={{ blog, setBlog, editorState, setEditorState, textEditor, setTextEditor }}>{editorState === "EDITOR" ? <BlogEditor /> : <PublishForm />}</EditorContext.Provider>
   );
};

export default Editor;
