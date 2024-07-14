import { Box, Button } from "@mui/material";
import TableComponent from "../../Layout/Table";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../../Constants/Constants";

interface Country {
  id: string;
  name: string;
  logo: string;
}
const Countries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(`${URL}/countries`);
        console.log("res", response.data);

        setCountries(response.data.data);
        console.log("setubi", countries);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCountries();
  },[]);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/admin/add-country");
  };

  const column = [
    { id: "no", label: "No", minWidth: 50 },
    { id: "name", label: "Name", minWidth: 100 },
    {
      id: "image",
      label: "Image",
      minWidth: 100,
      render: (row: any) => (
        <img src={row.image} alt={row.name} style={{ width: 50, height: 50 }} />
      ),
    },
  ];

  return (
    <>
      <TableComponent title="Countries" columns={column} data={countries} />
      <div className="mt-4 mr-2">
        <Button onClick={handleClick} variant="contained">
          Add
        </Button>
      </div>
    </>
  );
};

export default Countries;
