import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Pagination } from "@mui/material";
import { toast } from "react-toastify";
import { api } from "../../../Api/api";

interface UniversityData {
  id: string;
  name: string;
  address: string;
  ranking: string;
  country: string;
  logo: string;
  images: string[];
  isApproved: boolean;
}

const AllUniversities = () => {
  const [universities, setUniversities] = useState<UniversityData[]>([]);
  const [filteredUniversities, setFilteredUniversities] = useState<
    UniversityData[]
  >([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const universitiesPerPage = 6; // Number of universities to display per page
  const navigate = useNavigate();
  useEffect(() => {
    const getAllUniversities = async () => {
      try {
        const courses = await api.getAllUniversities();
        if (courses) {
          setUniversities(courses);
        } else {
          toast.error("failed to fetch Universities");
          return;
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response && error.response.data) {
            toast.error(error.response.data.message);
             // Assuming the backend sends the error message in 'message'
          } else {
            console.log
            (error.message);
          }
        } else {
          console.log(error);
        }
      }
    };
    getAllUniversities();
  }, []);

  useEffect(() => {
    const filtered = universities.filter((university) => {
      const lowerCaseQuery = searchQuery.toLowerCase();
      return (
        university.name.toLowerCase().includes(lowerCaseQuery) ||
        university.address.toLowerCase().includes(lowerCaseQuery) ||
        university.ranking.toLowerCase().includes(lowerCaseQuery) 
      );
    });
    setFilteredUniversities(filtered);
  }, [searchQuery, universities]);

  const handleClick = (universityId: string) => {
    navigate(`/universityDetails`, { state: { universityId } });
  };

  const indexOfLastUniversity = currentPage * universitiesPerPage;
  const indexOfFirstUniversity = indexOfLastUniversity - universitiesPerPage;
  const currentUniversities = filteredUniversities.slice(
    indexOfFirstUniversity,
    indexOfLastUniversity
  );

  const handlePageChange = (_: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };


  return (
    <div className="flex flex-col items-center  w-full">
      <div className="mb-4 mt-3">
        <h1 className="text-3xl font-semibold underline">Universities</h1>
      </div>
      <div className="float-right mt-2 w-96">
          <input
            type="text"
            placeholder="Search For University"
            onChange={handleSearchChange}
            value={searchQuery}
            className="w-full max-w-2xl p-2 border border-gray-400 rounded-md mb-3"
          />
        </div>
      <div className="flex flex-wrap justify-center gap-10 ml-16 mr-16 shadow-xl border">
        {currentUniversities.map((university) => (
          <div
            key={university.id}
            className={`flex flex-col items-center p-2 ${
              currentUniversities.length === 1
                ? "w-full"
                : currentUniversities.length === 2
                ? "sm:w-1/2 lg:w-1/2"
                : "sm:w-1/4 lg:w-1/4"
            }`}
          >
            <img
              className="w-96 h-60  shadow-2xl border-4 rounded-lg mt-3"
              src={university.logo}
              alt={university.name}
            />
            <Button
              onClick={() => handleClick(university.id)}
              variant="outlined"
            >
              {university.name}
            </Button>
          </div>
        ))}
      </div>
      <Pagination
        count={Math.ceil(universities.length / universitiesPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{ mt: 4 }}
      />
    </div>
  );
};

export default AllUniversities;
