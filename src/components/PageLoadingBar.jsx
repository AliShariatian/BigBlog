import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";

TopBarProgress.config({
   barColors: {
      0: "#242424",
      "1.0": "#242424",
   },
   barThickness: 3,
});

const PageLoadingBar = ({ children }) => {
   const [progress, setProgress] = useState(false);
   const [prevLocation, setPrevLocation] = useState("");
   
   const location = useLocation();

   useEffect(() => {
      setPrevLocation(location.pathname);
      setProgress(true);

      if (location.pathname === prevLocation) {
         setPrevLocation("");
      }
   }, [location]);

   useEffect(() => {
      setProgress(false);
   }, [prevLocation]);

   return (
      <>
         {progress && <TopBarProgress />}
         {children}
      </>
   );
};

export default PageLoadingBar;
