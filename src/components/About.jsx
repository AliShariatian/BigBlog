const About = ({className}) => {
   return (
      <div className={`${className} md:mt-7 md:w-[90%]`}>
         {/* Bio */}
         <p className="text-xl leading-7">
            Quinn is a 26-year-old former gym assistant who enjoys stealing candy from babies, shopping and working on cars. He is kind and gentle.
         </p>

         {/* Social links */}
         <div className="my-7 flex flex-wrap items-center gap-x-7 gap-y-2 text-dark-gray *:cursor-pointer *:text-xl hover:*:text-black">
            <i className="fi fi-brands-youtube"></i>
            <i className="fi fi-brands-instagram"></i>
            <i className="fi fi-brands-github"></i>
         </div>

         {/* Join at date */}
         <span className="text-xl leading-7 text-dark-gray">25 Sep 2023</span>
      </div>
   );
};

export default About;
