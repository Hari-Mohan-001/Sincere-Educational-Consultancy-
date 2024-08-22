import { useEffect, useState } from "react";
import { api } from "../../../../Api/api";

interface Country {
  id: string;
  name: string;
  image: string;
}
const Country = () => {
  const [countries, setCountries] = useState<Country[]>();

  useEffect(() => {
    const getCountries = async () => {
      try {
        const countries = await api.getAllCountries();
        setCountries(countries);
      } catch (error) {
        console.log(error);
      }
    };
    getCountries();
  }, []);
  return (
    <div className="flex flex-col mt-10">
    <div className="mb-4 flex justify-center">
      <h1 className="text-2xl mb-5 font-semibold">Countries we Operate</h1>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
      {countries?.map((country) => (
        <div key={country.id} className="flex flex-col items-center">
          <div className="shadow-2xl rounded-lg overflow-hidden">
            <img
              className="w-full h-32 object-cover"
              src={country.image}
              alt={country.name}
            />
          </div>
          <div className="mt-2">
            <h1 className="text-lg text-center">{country.name}</h1>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default Country;
