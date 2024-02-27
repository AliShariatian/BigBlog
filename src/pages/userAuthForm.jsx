import { useRef } from "react";
import { useNavigate } from "react-router-dom";

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
   const navigate = useNavigate();
   const authFormRef = useRef();

   // signin / signup form submit handler
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

      if (type === "signin") {
         navigate("/");
         return toast.success(`You signin successfully`);
      } else {
         navigate("/signin");
         return toast.success(`You signup successfully`);
      }
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
               <h1 className="mb-24 text-center font-secondary text-4xl">{type === "signin" ? "Welcome Back" : "Join Us Today"}</h1>

               {/* inputs */}
               {type === "signup" ? <InputBox name="fullName" type="text" placeholder="Full Name" icon="fi-rr-user" /> : null}
               <InputBox name="email" type="email" placeholder="Email" icon="fi-rr-envelope" />
               <InputBox name="password" type="password" placeholder="Password" icon="fi-rr-key" />

               {/* submit button */}
               <button onClick={submitHandler} type="submit" className="btn-dark center mt-4 px-10">
                  {type === "signin" ? "Sign In" : "Sign Up"}
               </button>

               {/* separator */}
               <div className="relative my-9 flex w-full items-center gap-2 font-bold text-black opacity-20">
                  <hr className="w-1/2 border-black" />
                  OR
                  <hr className="w-1/2 border-black" />
               </div>

               {/* continue with social */}
               <div>
                  <button onClick={googleAuthHandler} className="btn-light center flex w-11/12 items-center justify-center gap-4 border-1  hover:bg-black/10">
                     <img src={googleIcon} alt="login with google" className="size-6" />
                     <span className="normal-case">Continue with google</span>
                  </button>

                  <button
                     onClick={githubAuthHandler}
                     className="btn-light center mt-3 flex w-11/12 items-center justify-center gap-4 border-1 hover:bg-black/10"
                  >
                     <img src={githubIcon} alt="login with github" className="size-7" />
                     <span className="normal-case">Continue with github</span>
                  </button>
               </div>

               {/* link to signin or signup page */}
               {type === "signin" ? (
                  <p className="mt-6 text-center text-dark-gray">
                     Don't have an account?
                     <Link to="/signup" className="ml-1 text-black underline">
                        Join us today.
                     </Link>
                  </p>
               ) : (
                  <p className="mt-6 text-center text-dark-gray">
                     Already a member?
                     <Link to="/signin" className="ml-1 text-black underline">
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
