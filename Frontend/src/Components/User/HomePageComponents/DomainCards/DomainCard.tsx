import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../../Api/api";

interface Domain {
  id: string;
  name: string;
  image: string;
}
const DomainCard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getDomains = async () => {
      try {
        const domains = await api.getAllDomains();
        setDomains(domains);
      } catch (error) {
        console.log(error);
        // setError(error)
      }
    };
    getDomains();
  }, []);
  const [domains, setDomains] = useState<Domain[]>();

  const handleClick = (domainId: string) => {
    navigate(`/courses/domain`, { state: { domainId } });
  };
  return (
    //  <section className="flex justify-center items-center box-border">
    <div className="mt-16">
      <h1 className="text-center text-2xl font-bold">Major domains</h1>
      <div className="flex flex-wrap justify-around mt-12 p-1 bg-blue-950 rounded-lg shadow-xl ml-10 mr-10">
        {domains?.map((domain) => (
          <div
            key={domain.id}
            className="flex flex-col items-center m-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/5"
          >
            <div className="flex justify-center">
              <img
                className="w-52 h-48 rounded-lg"
                src={domain.image}
                alt={domain.name}
              />
            </div>
            <div className="mt-3">
              <button
                onClick={() => handleClick(domain.id)}
                className="bg-slate-400 font-medium text-black rounded-lg px-4 py-2"
              >
                {domain.name}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    // </section>
  );
};

export default DomainCard;
