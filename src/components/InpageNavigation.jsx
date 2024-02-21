import { useEffect, useRef, useState } from "react";

export let activeTabLineRef;
export let activeTabRef;

const InPageNavigation = ({ children, routes, defaultActiveIndex = 0, defaultHidden = [] }) => {
   const [inPageNavIndex, setInPageNavIndex] = useState(defaultActiveIndex);

   activeTabLineRef = useRef();
   activeTabRef = useRef();

   // onClick
   const changePageState = (btn, index) => {
      const { offsetWidth, offsetLeft } = btn;

      activeTabLineRef.current.style.width = `${offsetWidth}px`;
      activeTabLineRef.current.style.left = `${offsetLeft}px`;

      setInPageNavIndex(index);
   };

   // When page load
   useEffect(() => {
      changePageState(activeTabRef.current, defaultActiveIndex);
   }, []);

   return (
      <>
         <div className="relative mb-8 bg-white border-b border-grey flex flex-nowrap overflow-x-auto">
            {routes.map((route, index) => {
               return (
                  <button
                     ref={defaultActiveIndex === index ? activeTabRef : null}
                     onClick={(ev) => changePageState(ev.target, index)}
                     key={index}
                     className={`py-4 px-5 capitalize ${inPageNavIndex === index ? "text-black" : "text-gray-500"} ${defaultHidden.includes(route) ? "md:hidden" : ""}`}
                  >
                     {route}
                  </button>
               );
            })}

            <hr ref={activeTabLineRef} className="absolute border-black border-1 bottom-0 duration-300" />
         </div>

         {Array.isArray(children) ? children[inPageNavIndex] : children}
      </>
   );
};

export default InPageNavigation;
