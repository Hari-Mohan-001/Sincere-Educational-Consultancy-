import { Badge, Button } from "@mui/material";
import TableComponent from "../../Layout/Table";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { adminApi } from "../../../Api/adminApi";

interface UniversityData {
  _id: string;
  name: string;
  address: string;
  ranking: string;
  country: string;
  logo: string;
  images: string[];
  isApproved: boolean;
  countryName: string;
}

const AdminListUniversity = () => {
  const navigate = useNavigate();
  const [universities, setUniversities] = useState<UniversityData[]>([]);
  const [filteredUniversities, setFilteredUniversities] = useState<
    UniversityData[]
  >([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [count, setCount] = useState();
  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        const universities = await adminApi.getAllApprovedUniversities();
        setUniversities(universities);
      } catch (error) {
        console.error(error);
      }
    };

    const getNotApprovedUniversitiesCount = async () => {
      const count = await adminApi.getUnapprovedUniversitiesCount();
      setCount(count);
    };
    getNotApprovedUniversitiesCount();
    fetchUniversity();
  }, []);

  useEffect(() => {
    const filtered = universities.filter((university) => {
      const lowerCaseQuery = searchQuery.toLowerCase();
      return (
        university.name.toLowerCase().includes(lowerCaseQuery) ||
        university.address.toLowerCase().includes(lowerCaseQuery) ||
        university.ranking.toLowerCase().includes(lowerCaseQuery) ||
        university.countryName.toLowerCase().includes(lowerCaseQuery) ||
        (university.isApproved ? "approved" : "not approved").includes(
          lowerCaseQuery
        )
      );
    });
    setFilteredUniversities(filtered);
  }, [searchQuery, universities]);

  const handleApproval = () => {
    navigate("/admin/not-approved-universities");
  };

  const columns = [
    { id: "name", label: "Name", minWidth: 100 },
    { id: "address", label: "Address", minWidth: 100 },
    { id: "ranking", label: "Ranking", minWidth: 50 },
    {
      id: "country",
      label: "Country",
      minWidth: 100,
      render: (row: UniversityData) => row.countryName,
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
      render: (row: UniversityData) =>
        row.isApproved ? (
          <Button variant="contained" color="success">
            Approved
          </Button>
        ) : (
          <Button variant="contained" color="error">
            Approve
          </Button>
        ),
    },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-end mt-3 gap-2">
        <div>
          <input
            type="text"
            placeholder="Search university"
            onChange={handleSearchChange}
            value={searchQuery}
            className="w-full max-w-xs p-2 border border-gray-400 rounded-md mb-3"
          />
        </div>
        <div>
          <Badge badgeContent={count} color="primary">
            <Button
              onClick={handleApproval}
              variant="contained"
              color="secondary"
            >
              Pending Approvals
            </Button>
          </Badge>
        </div>
      </div>
      <div>
        <TableComponent
          title="Universities"
          columns={columns}
          data={filteredUniversities}
        />
      </div>
    </div>
  );
};

export default AdminListUniversity;
