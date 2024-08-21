import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/enrollment");
  };
  return (
    <div className="flex flex-col mt-14">
      <div className="flex justify-center">
        <h1 className="font-bold text-2xl text-blue-800">
          What is <span className="font-bold text-cyan-500">ScS ??</span>
        </h1>
      </div>
      <div className=" ml-52 mt-3 w-2/3 max-w">
        <h1>
          Welcome to Sincere Educational Consultancy! At Sincere Educational
          Consultancy, we are dedicated to helping students turn their dreams of
          studying abroad into reality. With years of experience and a team of
          knowledgeable professionals, we guide you through every step of the
          process—from choosing the right course and university to navigating
          visa applications and settling into your new environment.We understand
          that every student is unique. Our team provides tailored advice to
          help you choose the right path based on your academic background,
          career goals, and personal preferences. We have established strong
          connections with top universities and educational institutions around
          the world. Whether you're interested in studying in the USA, UK,
          Canada, Australia, or any other country, we can help you find the
          perfect fit.
        </h1>
      </div>
      <div className="flex justify-center">
        <div>
          <img
            className="rounded-s-3xl w-80 h-52"
            src="https://mir-s3-cdn-cf.behance.net/projects/404/b2a698115941301.Y3JvcCwxMDY4LDgzNiw5Miww.jpg"
            alt=""
          />
        </div>
        <div>
          <button
            className="rounded-3xl text-white bg-black w-40 h-10 mt-24 ml-6"
            onClick={handleClick}
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
