import { Button } from "@mui/material";
import TableComponent from "../../Layout/Table";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CounsellorRootState } from "../../../Interface/Counsellor/CounsellorInterface";
import { useSelector } from "react-redux";
import { api } from "../../../Api/api";

interface Country {
  _id: string;
  name: string;
}

interface UniversityData {
  id: string;
  name: string;
  address: string;
  ranking: string;
  country: Country;
  logo: string;
  images: string[];
  isApproved: boolean;
}

const ListUniversity = () => {
  const [universities, setUniversities] = useState<UniversityData[]>([]);
  const [filteredUniversities, setFilteredUniversities] = useState<
  UniversityData[]
>([]);
const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();
  const { counsellor } = useSelector(
    (state: CounsellorRootState) => state.counsellor
  );
  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        if (counsellor) {
          const countryId = counsellor.country;
          const universities = await api.getUniversities(countryId);
          if (universities) {
            setUniversities(universities);
          }
        } else {
          navigate("/counsellor/signin");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUniversity();
  }, []);

  useEffect(() => {
    const filtered = universities.filter((university) => {
      const lowerCaseQuery = searchQuery.toLowerCase();
      return (
        university.name.toLowerCase().includes(lowerCaseQuery) ||
        university.address.toLowerCase().includes(lowerCaseQuery) ||
        university.ranking.toLowerCase().includes(lowerCaseQuery) ||
        university.country.name.toLowerCase().includes(lowerCaseQuery) ||
        (university.isApproved ? "approved" : "not approved").includes(
          lowerCaseQuery
        )
      );
    });
    setFilteredUniversities(filtered);
  }, [searchQuery, universities]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  

  const handleClick = () => {
    navigate("/counsellor/add-university");
  };

  const columns = [
    { id: "name", label: "Name", minWidth: 100 },
    { id: "address", label: "Address", minWidth: 100 },
    { id: "ranking", label: "Ranking", minWidth: 50 },
    {
      id: "country",
      label: "Country",
      minWidth: 100,
      render: (row: UniversityData) => row.country.name,
    },
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
      <div className="flex float-end">
      <div className="mt-4 mr-2 float-end">
        <Button onClick={handleClick} variant="contained">
          Add University
        </Button>
      </div>
      <div>
          <input
            type="text"
            placeholder="Search university"
            onChange={handleSearchChange}
            value={searchQuery}
            className="w-full max-w-xs p-2 border border-gray-400 rounded-md mb-3 mt-4"
          />
        </div>
        </div>
      <TableComponent
        title="Universities"
        columns={columns}
        data={filteredUniversities}
      />
    </>
  );
};

export default ListUniversity;
