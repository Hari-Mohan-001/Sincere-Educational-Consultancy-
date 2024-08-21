const Banner = () => {
  return (
    <div className="bg-sky-300 !max-w-full h-px-400 flex rounded-lg shadow-xl">
      <div className="w-1/2 ml-10 mt-24">
        <h1 className="font-bold text-3xl   text-indigo-800 mb-4">
          Confused???
        </h1>
        <h1 className="font-bold text-3xl   text-white mb-4">
          We are here to help you
        </h1>
        <h4 className="text-white">
          SeC is one of the leading consultancy platform,
        </h4>
        <h4 className="text-white">
          which will provide you with amble carrer options & proper guidance.
        </h4>
      </div>
      <div className="lg:w-1/2">
        <img
          className="rounded-full shadow-xl"
          src="../../../Images/banner.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Banner;
