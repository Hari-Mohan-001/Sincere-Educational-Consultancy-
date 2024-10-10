import { Button } from "@mui/material";
import TableComponent from "../../Layout/Table";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../../Api/api";

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
        const domains = await api.getAllDomains();
        setDomains(domains);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDomains();
  }, []);
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
        <img
          src={row.image}
          alt={row.name}
          style={{ width: 100, height: 70 }}
        />
      ),
    },
  ];

  return (
    <>
      
      <div className="mt-4 mr-2 float-end">
        <Button onClick={handleClick} variant="contained">
          Add
        </Button>
      </div>
      <TableComponent title="Domains" columns={column} data={domains} />
    </>
  );
};

export default DomainList;
