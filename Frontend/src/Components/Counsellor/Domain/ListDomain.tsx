import { Box, Button } from "@mui/material";
import TableComponent from "../../Layout/Table";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../../Constants/Constants";

interface Domain {
  id: string;
  name: string;
  image: string;
}
const DomainList = () => {
  const [domains, setDomains] = useState<Domain[]>([]);
  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const response = await axios.get(`${URL}/domains`,{
          withCredentials:true
        });
        console.log("res", response.data);

        setDomains(response.data.data);
        console.log("setubi", domains);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDomains();
  },[]);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/counsellor/add-domain");
  };

  const column = [
    // { id: "no", label: "No", minWidth: 50 },
    { id: "name", label: "Name", minWidth: 100 },
    {
      id: "image",
      label: "Image",
      minWidth: 100,
      render: (row: any) => (
        <img src={row.image} alt={row.name} style={{ width: 100, height: 70 }} />
      ),
    },
  ];

  return (
    <>
      <TableComponent title="Domains" columns={column} data={domains} />
      <div className="mt-4 mr-2">
        <Button onClick={handleClick} variant="contained">
          Add
        </Button>
      </div>
    </>
  );
};

export default DomainList;
