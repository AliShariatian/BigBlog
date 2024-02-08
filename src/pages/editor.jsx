import { useState } from "react";
import BlogEditor from "../components/BlogEditor";
import PublishForm from "../components/PublishForm";

const Editor = () => {
   const [editorState, setEditorState] = useState("EDITOR");

   return editorState === "EDITOR" ? <BlogEditor /> : <PublishForm />;
};

export default Editor;
