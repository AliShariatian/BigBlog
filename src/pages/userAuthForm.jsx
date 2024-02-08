import { useRef } from "react";

// components import
import { Link } from "react-router-dom";
import InputBox from "../components/InputBox";
import AnimationWrapper from "../common/AnimationWrapper";
import { toast } from "react-hot-toast";

// Auth with social import
import googleIcon from "../imgs/google.svg";
import githubIcon from "../imgs/github.svg";

const FULLNAME_LENGTH = 3;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

const UserAuthForm = ({ type }) => {
   const authFormRef = useRef();

   // sign-in / sign-up form submit handler
   const submitHandler = (ev) => {
      ev.preventDefault();

      // get form data
      const form = new FormData(authFormRef.current);
      let formData = {};

      for (const [key, value] of form.entries()) {
         formData[key] = value;
      }

      const { fullName, email, password } = formData;

      // FORM VALIDATION
      if (!(typeof fullName == "undefined") && fullName.length < FULLNAME_LENGTH) {
         return toast.error(`Full Name must be at least ${FULLNAME_LENGTH} letters long!`);
      }

      if (!email.length) {
         return toast.error("Enter email!");
      }

      if (!EMAIL_REGEX.test(email)) {
         return toast.error("Email is invalid!");
      }

      if (!PASSWORD_REGEX.test(password)) {
         return toast.error("Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters!");
      }

      const route = type === "sign-in" ? "signin" : "signup";

      return toast.success(`You ${route} successfully`);
   };

   // auth with github
   const githubAuthHandler = (ev) => {
      ev.preventDefault();
      return toast.error("It's not possible at this moment!");
   };

   // auth with google
   const googleAuthHandler = (ev) => {
      ev.preventDefault();
      return toast.error("It's not possible at this moment!");
   };

   return (
      <AnimationWrapper keyValue={type} className="overflow-y-auto">
         <section className="h-cover flex items-center justify-center">
            <form ref={authFormRef} className="w-[80%] max-w-[400px]">
               <h1 className="text-4xl font-secondary text-center mb-24">{type === "sign-in" ? "Welcome Back" : "Join Us Today"}</h1>

               {/* inputs */}
               {type === "sign-up" ? <InputBox name="fullName" type="text" placeholder="Full Name" icon="fi-rr-user" /> : null}
               <InputBox name="email" type="email" placeholder="Email" icon="fi-rr-envelope" />
               <InputBox name="password" type="password" placeholder="Password" icon="fi-rr-key" />

               {/* submit button */}
               <button onClick={submitHandler} type="submit" className="btn-dark center mt-4 px-10">
                  {type === "sign-in" ? "Sign In" : "Sign Up"}
               </button>

               {/* separator */}
               <div className="relative w-full flex items-center gap-2 my-9 opacity-20 text-black font-bold">
                  <hr className="w-1/2 border-black" />
                  OR
                  <hr className="w-1/2 border-black" />
               </div>

               {/* continue with social */}
               <div>
                  <button onClick={googleAuthHandler} className="btn-light hover:bg-black/10 border-1 flex items-center justify-center gap-4 w-11/12  center">
                     <img src={googleIcon} alt="login with google" className="size-6" />
                     <span className="normal-case">Continue with google</span>
                  </button>

                  <button onClick={githubAuthHandler} className="btn-light border-1 hover:bg-black/10 mt-3 flex items-center justify-center gap-4 w-11/12 center">
                     <img src={githubIcon} alt="login with github" className="size-7" />
                     <span className="normal-case">Continue with github</span>
                  </button>
               </div>

               {/* link to sign-in or sign-up page */}
               {type === "sign-in" ? (
                  <p className="mt-6 text-dark-gray text-center">
                     Don't have an account?{" "}
                     <Link to="/signup" className="underline text-black ml-1">
                        Join us today.
                     </Link>
                  </p>
               ) : (
                  <p className="mt-6 text-dark-gray text-center">
                     Already a member?{" "}
                     <Link to="/signin" className="underline text-black ml-1">
                        Sign in here.
                     </Link>
                  </p>
               )}
            </form>
         </section>
      </AnimationWrapper>
   );
};

export default UserAuthForm;
