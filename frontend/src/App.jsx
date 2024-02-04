import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components import
import Navbar from "./components/Navbar";

const App = () => {
   return (
      <Router>
         <Navbar />

         <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/signin" element={<h1>in</h1>} />
            <Route path="/signup" element={<h1>up</h1>} />
         </Routes>
      </Router>
   );
};

export default App;
