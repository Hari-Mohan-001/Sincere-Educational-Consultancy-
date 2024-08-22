const Success = () => {
  return (
    <div className="w-full flex flex-col mt-8">
      <div className="flex justify-center mt-3">
        <h1 className="font-semibold text-2xl mb-6">Our Success</h1>
      </div>
      <div className="flex flex-wrap justify-center gap-8 lg:gap-16 w-full">
        <div className="flex flex-col items-center">
          <h3 className="text-rose-500 font-bold text-4xl lg:text-5xl">15K+</h3>
          <h3 className="text-center">Students</h3>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-rose-500 font-bold text-4xl lg:text-5xl">75%</h3>
          <h3 className="text-center">Success</h3>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-rose-500 font-bold text-4xl lg:text-5xl">80+</h3>
          <h3 className="text-center">Universities</h3>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-rose-500 font-bold text-4xl lg:text-5xl">15+</h3>
          <h3 className="text-center">Countries</h3>
        </div>
      </div>
    </div>
  );
};

export default Success;
