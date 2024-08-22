import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../../../Api/api";

interface UniversityData {
  id: string;
  name: string;
  address: string;
  ranking: string;
  country: string;
  logo: string;
  images: string[];
  isApproved: boolean;
}

const UniversityCard = () => {
  const [universities, setUniversities] = useState<UniversityData[]>([]);
 

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const universities = await api.getAllUniversities();

        setUniversities(universities.slice(0, 4));
      } catch (error) {
        console.error("Error fetching country data:", error);
      } 
    };

    fetchUniversities();
  }, []);
  return (
    <div className="flex flex-col items-center mt-5 w-full">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">Top Universities</h1>
      </div>
      <div className="flex flex-wrap justify-center gap-10 ml-16 mr-16">
        {universities.map((university) => (
          <div
            key={university.id}
            className="flex flex-col items-center w-1/2 sm:w-1/4 lg:w-1/3 p-2"
          >
            <img
              className="w-80 h-60  shadow-2xl border"
              src={university.logo}
              alt={university.name}
            />
          </div>
        ))}
      </div>
      <Link to={"/universities"}>
        <p className="text-blue-600 mt-5 text-xl underline">See More</p>
      </Link>
    </div>
  );
};

export default UniversityCard;
