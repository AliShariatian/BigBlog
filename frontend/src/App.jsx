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

            <Toaster />

            <Routes>
               <Route path="/" element={<Navbar />}>
                  <Route path="/signin" element={<UserAuthForm type="sign-in" />} />
                  <Route path="/signup" element={<UserAuthForm type="sign-up" />} />
               </Route>
            </Routes>

            {/* footer */}
         </UserContext.Provider>
      </Router>
   );
};

export default App;
