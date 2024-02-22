const LoadMorePostBtn = ({ onClick }) => {
   return (
      <div className="flex justify-center mb-10">
         <button onClick={onClick} className="btn-light">
            Load More
         </button>
      </div>
   );
};

export default LoadMorePostBtn;
