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
      <div className="flex justify-around   shadow-inner p-5">
        {countries?.map((country) => {
          return (
            <div key={country.id} className="flex ">
              <div className="flex flex-col">
                <div className="shadow-2xl">
                  <img
                    className="w-52 h-32 shadow-2xl"
                    src={country.image}
                    alt=""
                  />
                </div>

                <div className="flex justify-center ">
                  <h1 className="text-lg">{country.name}</h1>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Country;
