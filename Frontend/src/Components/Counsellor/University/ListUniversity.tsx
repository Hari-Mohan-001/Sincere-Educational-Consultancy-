import {Button } from "@mui/material";
import TableComponent from "../../Layout/Table";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../../Constants/Constants";
import { CounsellorRootState } from "../../../Interface/Counsellor/CounsellorInterface";
import { useSelector } from "react-redux";

interface Country {
  _id: string;
  name: string;
}

interface UniversityData {
  id: string;
  name: string;
  address: string;
  ranking: string;
  country:  Country;
  logo: string;
  images: string[];
  isApproved: boolean;
}

const ListUniversity = () => {
  const navigate = useNavigate();
  const { counsellor } = useSelector(
    (state: CounsellorRootState) => state.counsellor
  );
  useEffect(() => {
    const fetchUniversity = async () => {
      
      try {
        if (counsellor) {
          const countryId = counsellor.country;

          const response = await axios.get(`${URL}/universities/${countryId}`);
          console.log('res',response.data);

          setUniversities(response.data.getUniversities);
          console.log('setubi',universities);
        } else {
          navigate("/counsellor/signin");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUniversity();
  }, []);

  const [universities, setUniversities] = useState<UniversityData[]>([]);

  const handleClick = () => {
    navigate("/counsellor/add-university");
  };

  const columns = [
    { id: "name", label: "Name", minWidth: 100 },
    { id: "address", label: "Address", minWidth: 100 },
    { id: "ranking", label: "Ranking", minWidth: 50 },
    { id: "country", label: "Country", minWidth: 100,render: (row: UniversityData) =>row.country.name},
    {
      id: "logo",
      label: "Logo",
      minWidth: 100,
      render: (row: UniversityData) => (
        <img src={row.logo} alt={row.name} style={{ width: 50, height: 50 }} />
      ),
    },
    {
      id: "isApproved",
      label: "Approved",
      minWidth: 50,
      render: (row: UniversityData) => (row.isApproved ? "Yes" : "No"),
    },
  ];

  return (
    <>
      <TableComponent title="Universities" columns={columns} data={universities}/>
      <div className="mt-4 mr-2">
        <Button onClick={handleClick} variant="contained">
          Add
        </Button>
      </div>
    </>
  );
};

export default ListUniversity;
