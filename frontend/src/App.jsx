import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
// components import
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
// pages import
import UserAuthForm from "./pages/userAuthForm";
import { lookInSession } from "./common/session";

export const UserContext = createContext({});

const App = () => {
   const [userAuth, setUserAuth] = useState({});

   useEffect(() => {
      const userInSession = lookInSession("user");
      userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({ access_token: null });
   }, []);

   return (
      <Router>
         <UserContext.Provider value={{ userAuth, setUserAuth }}>
            {/* header */}
            <Navbar />
            <Toaster />

            <Routes>
               <Route path="/" element={<h1>Home</h1>} />
               <Route path="/signin" element={<UserAuthForm type="sign-in" />} />
               <Route path="/signup" element={<UserAuthForm type="sign-up" />} />
            </Routes>

            {/* footer */}
         </UserContext.Provider>
      </Router>
   );
};

export default App;
