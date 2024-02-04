import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components import
import Navbar from "./components/Navbar";

// pages import
import UserAuthForm from "./pages/userAuthForm";

const App = () => {
   return (
      <Router>
         {/* header */}
         <Navbar />

         <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/signin" element={<UserAuthForm type="sign-in" />} />
            <Route path="/signup" element={<UserAuthForm type="sign-up" />} />
         </Routes>

         {/* footer */}
      </Router>
   );
};

export default App;
