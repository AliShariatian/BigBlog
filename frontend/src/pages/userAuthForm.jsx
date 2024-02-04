import { Link } from "react-router-dom";
import InputBox from "../components/InputBox";

import githubIcon from "../imgs/github.svg";

const UserAuthForm = ({ type }) => {
   return (
      <section className="h-cover flex items-center justify-center">
         <form className="w-[80%] max-w-[400px]">
            <h1 className="text-4xl font-secondary text-center mb-24">{type === "sign-in" ? "Welcome Back" : "Join Us Today"}</h1>

            {/* inputs */}
            {type === "sign-up" ? <InputBox name="fullName" type="text" placeholder="Full Name" icon="fi-rr-user" /> : null}
            <InputBox name="email" type="email" placeholder="Email" icon="fi-rr-envelope" />
            <InputBox name="password" type="password" placeholder="Password" icon="fi-rr-key" />

            {/* submit button */}
            <button type="submit" className="btn-dark center mt-10">
               {type === "sign-in" ? "Sign In" : "Sign Up"}
            </button>

            {/* separator */}
            <div className="relative w-full flex items-center gap-2 my-10 opacity-20 text-black font-bold">
               <hr className="w-1/2 border-black" />
               OR
               <hr className="w-1/2 border-black" />
            </div>

            {/* continue with social */}
            <button className="btn-dark flex items-center justify-center gap-4 w-10/12 center">
               <img src={githubIcon} alt="github" className="size-7 invert" /> Continue With Github
            </button>

            {/* link to sign-in or sign-up page */}
            {type === "sign-in" ? (
               <p className="mt-6 text-dark-grey text-xl text-center">
                  Don't have an account?{" "}
                  <Link to="/signup" className="underline text-black ml-1 text-xl">
                     Join us today.
                  </Link>
               </p>
            ) : (
               <p className="mt-6 text-dark-grey text-xl text-center">
                  Already a member?{" "}
                  <Link to="/signin" className="underline text-black ml-1 text-xl">
                     Sign in here.
                  </Link>
               </p>
            )}
         </form>
      </section>
   );
};

export default UserAuthForm;
