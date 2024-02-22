import { Link } from "react-router-dom";
import fullLogo from "../imgs/fullLogo.png";

const Page404 = () => {
   return (
      <section className="h-cover p-10 flex flex-col justify-between text-center">
         <div className="flex flex-col gap-16 mt-20">
            <h2 className="text-4xl font-normal font-secondary">Page Not Found!</h2>
            <p className="text-dark-gray text-xl leading-7 -mt-8">
               The page you are looking for does not exists. Head back to the{" "}
               <Link to="/" className="text-black underline">
                  Home Page
               </Link>
            </p>
         </div>

         <div>
            <Link to="/">
               <img src={fullLogo} alt="logo" className="h-8 object-contain block mx-auto select-none" />
            </Link>
            <p className="mt-5 text-dark-gray">Read millions of stories around the world</p>
         </div>
      </section>
   );
};

export default Page404;
