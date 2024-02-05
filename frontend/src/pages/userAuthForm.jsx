import { useRef } from "react";
import axios from "../axios/userAuth";

// components import
import { Link } from "react-router-dom";
import InputBox from "../components/InputBox";
import AnimationWrapper from "../common/AnimationWrapper";
import { toast } from "react-hot-toast";

import githubIcon from "../imgs/github.svg";

const FULLNAME_LENGTH = 3;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

const UserAuthForm = ({ type }) => {
   // NOTE: if when use authFormRef return error, can use id value and add to form element and put into FormData(idName).
   const authFormRef = useRef();

   // connect to server fo form validation and send data to database
   const userAuthThroughServer = (serverRoute, formData) => {
      axios
         .post(serverRoute, formData)
         .then(({ data }) => {
            console.log(data);
         })
         .catch(({ response }) => {
            toast.error(response.data.error);
         });
   };

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

      const serverRoute = type === "sign-in" ? "/signin" : "/signup";

      userAuthThroughServer(serverRoute, formData);
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
               <button onClick={submitHandler} type="submit" className="btn-dark center mt-10">
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
      </AnimationWrapper>
   );
};

export default UserAuthForm;
