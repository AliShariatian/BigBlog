const LoadMorePostBtn = ({ onClick }) => {
   return (
      <div className="mb-10 flex justify-center">
         <button onClick={onClick} className="btn-light">
            Load More
         </button>
      </div>
   );
};

export default LoadMorePostBtn;
