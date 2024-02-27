import { Link } from "react-router-dom";
import fullLogo from "../imgs/fullLogo.png";

const Page404 = () => {
   return (
      <section className="h-cover flex flex-col justify-between p-10 text-center">
         <div className="mt-20 flex flex-col gap-16">
            <h2 className="font-secondary text-4xl font-normal">Page Not Found!</h2>
            <p className="-mt-8 text-xl leading-7 text-dark-gray">
               The page you are looking for does not exists. Head back to the{" "}
               <Link to="/" className="text-black underline">
                  Home Page
               </Link>
            </p>
         </div>

         <div>
            <Link to="/">
               <img src={fullLogo} alt="logo" className="mx-auto block h-8 select-none object-contain" />
            </Link>
            <p className="mt-5 text-dark-gray">Read millions of stories around the world</p>
         </div>
      </section>
   );
};

export default Page404;
