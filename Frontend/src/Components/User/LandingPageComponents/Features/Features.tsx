const Features = () => {
  return (
    <div className="flex flex-col mt-8 px-4">
      <div className="flex flex-col items-center text-center mb-7">
        <h1 className="text-cyan-500 font-bold text-2xl">
          <span className="text-indigo-700 font-bold">Our </span>
          Features
        </h1>
        <p className="text-gray-700 mt-2">We are offering you one of the best features</p>
      </div>

      <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between lg:mx-20">
        <div className="lg:mt-20 mb-8 lg:mb-0 lg:ml-20 text-center lg:text-left">
          <h1 className="text-indigo-700 text-xl font-bold">One-On-One</h1>
          <h1 className="text-cyan-500 text-xl font-bold">Discussion</h1>
          <div className="w-full lg:w-96 mt-4">
            <p>
              After enrollment, you can have a personalized talk with our
              country counselors. You can have a personalized chat or a video
              conference of your choice. Choose the right program that suits
              your eligibility and pursue your dreams.
            </p>
          </div>
        </div>
        <div className="lg:ml-20">
          <img
            className="w-full max-w-xs lg:max-w-sm object-contain"
            src="../../../Images/Discussion.png"
            alt="Discussion"
          />
        </div>
      </div>
    </div>
  );
};

export default Features;
