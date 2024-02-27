import { useState } from "react";

const InputBox = ({ name, type, value, placeholder, id, icon }) => {
   const [passwordVisible, setPasswordVisible] = useState(false);

   return (
      <div className="relative mb-4 w-full">
         <input
            type={type === "password" ? (passwordVisible ? "text" : "password") : type}
            name={name}
            id={id}
            placeholder={placeholder}
            defaultValue={value}
            className="input-box"
         />
         <i className={`input-icon fi ${icon}`}></i>
         {type === "password" ? (
            <i
               onClick={() => setPasswordVisible(!passwordVisible)}
               className={`fi ${passwordVisible ? "fi-rr-eye" : "fi-rr-eye-crossed"} fi-rr-eye-crossed input-icon left-auto right-4 cursor-pointer select-none`}
            ></i>
         ) : null}
      </div>
   );
};

export default InputBox;
