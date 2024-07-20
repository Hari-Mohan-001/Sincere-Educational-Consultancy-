import axios from "axios";
import { useEffect, useState } from "react";
import { URL } from "../../../../Constants/Constants";

interface Country {
  id: string;
  name: string;
  image: string;
}
const CountryCards = () => {
  const [countries, setCountries] = useState<Country[]>();
  const [error, setError] = useState("");

  useEffect(() => {
    const getCountries = async () => {
      try {
        const response = await axios.get(`${URL}/countries`);
        const data = response.data;
        console.log("lj", data);

        setCountries(data.data);
      } catch (error) {
        console.log(error);
        // setError(error)
      }
    };
    getCountries();
  }, []);
  return (
    <div className="flex flex-col mt-10">
      <div className="mb-4 flex justify-center">
        <h1 className="text-2xl mb-5 font-semibold">Countries we Operate</h1>
      </div>
      <div className="flex justify-around   shadow-inner p-5 flex-wrap">
        {countries?.map((country) => {
          return (
            <div key={country.id} className="flex w-full justify-center lg:w-1/6 p-2">
              <div className="flex flex-col ">
                <div className="shadow-2xl">
                  <img className="w-52 h-32 shadow-2xl" src={country.image} alt="" />
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

export default CountryCards;
