const Career = () => {
  return (
    <div className="flex flex-col md:flex-row mt-16">
  {/* Text Section */}
  <div className="w-full md:w-1/2 h-80 flex justify-center items-center">
    <div className="w-11/12 md:w-96 min-h-24 p-4">
      <h1 className="text-xl text-center md:text-left">
        <span className="text-cyan-700 font-bold">E</span>verything you need
        to know about your future career options, you can do with{" "}
        <span className="text-cyan-500 text-xl font-bold">SeS</span>. Get a
        strong knowledge on the career options available for you to achieve
        your dreams!
      </h1>
    </div>
  </div>

  {/* Image Section */}
  <div className="w-full md:w-1/2 h-80 flex justify-center items-center">
    <div className="h-full w-11/12">
      <img
        className="h-full w-full object-cover border shadow-inner rounded"
        src="../../../Images/career.jpg"
        alt="Career options"
      />
    </div>
  </div>
</div>

  );
};

export default Career;
