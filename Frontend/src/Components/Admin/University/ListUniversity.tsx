import { Button } from "@mui/material";
import TableComponent from "../../Layout/Table";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ADMIN_BASE_URL, URL } from "../../../Constants/Constants";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const mySwal = withReactContent(Swal);

// interface Country {
//   _id: string;
//   name: string;
// }

interface UniversityData {
  _id: string;
  name: string;
  address: string;
  ranking: string;
  country: string;
  logo: string;
  images: string[];
  isApproved: boolean;
  countryName:string;
}

const AdminListUniversity = () => {
  const navigate = useNavigate();
  const [universities, setUniversities] = useState<UniversityData[]>([]);
  const [filteredUniversities, setFilteredUniversities] = useState<UniversityData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        const response = await axios.get(`${ADMIN_BASE_URL}/universities`,{
          withCredentials:true
        });
        console.log("res", response.data);

        setUniversities(response.data.data);
        console.log("setubi", universities);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUniversity();
  }, []);

  useEffect(()=>{
    const filtered = universities.filter((university)=>{
      const lowerCaseQuery = searchQuery.toLowerCase()
      return(
        university.name.toLowerCase().includes(lowerCaseQuery)||
        university.address.toLowerCase().includes(lowerCaseQuery)||
        university.ranking.toLowerCase().includes(lowerCaseQuery)||
        university.countryName.toLowerCase().includes(lowerCaseQuery)||
        (university.isApproved ? "approved" : "not approved").includes(lowerCaseQuery)
      )
    })
    setFilteredUniversities(filtered)
  },[searchQuery,universities])



  const approveUniversity = async (id: string, isApproved: Boolean) => {
    try {
      const response = await axios.patch(`${ADMIN_BASE_URL}/university/${id}`,{},{
        withCredentials:true
      });
      if (response.status === 200) {
        toast.success("University approved Successfully");
        setUniversities((prevUniversity) =>
          prevUniversity.map((university) =>
            university._id === id
              ? { ...university, isApproved: !isApproved }
              : university
          )
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Handle axios-specific errors here
        toast.error(`Error: ${error.response.data.message}`);
      } else if (error instanceof Error) {
        // Handle other error types
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  const handleClick = async (id: string, isApproved: Boolean) => {
    mySwal
      .fire({
        title: `Are you sure you want to ${
          isApproved ? "Approve" : "Approve"
        } this university?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      })
      .then((result) => {
        if (result.isConfirmed) {
          approveUniversity(id, isApproved);
        }
      });
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
          <Button
            onClick={() => handleClick(row._id, row.isApproved)}
            variant="contained"
            color="error"
          >
            Approve
          </Button>
        ),
    },
  ];

  const handleSearchChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setSearchQuery(e.target.value)
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-end mt-3">
      <input
          type="text"
          placeholder="Search university"
          onChange={handleSearchChange}
          value={searchQuery}
          className="w-full max-w-xs p-2 border border-gray-400 rounded-md mb-3"
        />
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
