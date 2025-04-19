const ShowFeatures = ({ children, onClick, condition }) => {
  return (
    <div
      className={`flex size-[60px] justify-center items-center flex-col rounded-md px-3 py-[6px] hover:cursor-pointer
       hover:bg-indigo-200 hover:text-indigo-600 duration-300 
       ${condition ? " text-indigo-600" : "bg-white text-black"}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default ShowFeatures;
