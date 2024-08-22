const Banner = () => {
  return (
    <div className="bg-sky-300 w-full flex flex-col lg:flex-row rounded-lg shadow-xl p-6 lg:p-0  min-h-[300px] lg:min-h-[350px]">
      {/* Text Section */}
      <div className="lg:w-1/2 w-full lg:ml-10 mt-8 lg:mt-24 text-center lg:text-left px-4 lg:px-0">
        <h1 className="font-bold text-2xl lg:text-3xl text-indigo-800 mb-4">
          Confused???
        </h1>
        <h1 className="font-bold text-2xl lg:text-3xl text-white mb-4">
          We are here to help you
        </h1>
        <h4 className="text-white text-lg lg:text-xl">
          SeC is one of the leading consultancy platforms,
        </h4>
        <h4 className="text-white text-lg lg:text-xl">
          which will provide you with ample career options & proper guidance.
        </h4>
      </div>

      {/* Image Section */}
      <div className="lg:w-1/2 w-full flex justify-center lg:justify-end mt-8 lg:mt-0">
        <img
          className="rounded-full shadow-xl w-2/3 lg:w-1/2"
          src="../../../Images/banner.png"
          alt="Banner"
        />
      </div>
    </div>
  );
};

export default Banner;
