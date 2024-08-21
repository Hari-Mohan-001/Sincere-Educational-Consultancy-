const Features = () => {
  return (
    <div className="flex flex-col mt-8">
      <div className="flex justify-center mb-7 mr-7">
        <div>
          <div>
            <h1 className="text-cyan-500 font-bold text-2xl ml-20">
              {" "}
              <span className="text-indigo-700 font-bold text-2xl">Our </span>
              Features
            </h1>
          </div>
          <div className="mr-16">
            <h1>We are offering you one of the best features </h1>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="mt-20 ml-32">
          <h1 className="text-indigo-700 text-xl font-bold">One-On-One</h1>
          <h1 className="text-cyan-500 text-xl font-bold">Discussion</h1>
          <div className="w-96">
            <p>
              After the enrolment you can have a personalised talk with our
              country counsellors, you can a have personalised chat or a video
              conference of your choice.Choose the right program which suits
              your eligibility and pursue your dreams.
            </p>
          </div>
        </div>
        <div className="mt-5 ml-20">
          <img src="../../../Images/Discussion.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Features;
