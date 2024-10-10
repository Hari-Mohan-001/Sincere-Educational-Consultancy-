import { useEffect, useState } from "react";
import TableComponent from "../../Layout/Table";
import { Badge, Button } from "@mui/material";
import { adminApi } from "../../../Api/adminApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface CounsellorData{
  name:string
  email:string
  mobile:string
  country:string
  isApproved:string
  image:string
}

const CounsellorList = () => {
  
  const [counsellors, setcounsellors] = useState<CounsellorData[]>([]);
  const [filteredCounsellors, setFilteredCounsellors] = useState<
  CounsellorData[]
  >([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [count, setCount] = useState()
const navigate = useNavigate()

  useEffect(() => {
    const fetchApprovedCounsellors = async () => {
      try {
        const counsellorData = await adminApi.getApprovedCounsellors();
        setcounsellors(counsellorData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApprovedCounsellors();
  }, []); 

  useEffect(()=>{
   const fetchUnApprovedCounsellorCount = async()=>{
    const count = await adminApi.getUnApprovedCounsellorsCount() 
    console.log(count,'cnt', typeof count);
    
    if(count>=0){
      setCount(count)
    }else{
      toast.error("unable to fetch count")
    }
    
   }
   fetchUnApprovedCounsellorCount()
  },[count])

  useEffect(() => {
    const filtered = counsellors.filter((counsellor) => {
      const lowerCaseQuery = searchQuery.toLowerCase();
      return (
        counsellor.name.toLowerCase().includes(lowerCaseQuery) ||
        counsellor.email.toLowerCase().includes(lowerCaseQuery) ||
        counsellor.country.toLowerCase().includes(lowerCaseQuery)
        
      );
    });
    setFilteredCounsellors(filtered);
  }, [searchQuery, counsellors]);

  const handleApprovalPage = async()=>{
    navigate("/admin/not-approved-counsellors")
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const columns = [
    // { id: "no", label: "No", minWidth: 50 },
    { id: "name", label: "Name", minWidth: 100 },
    { id: "email", label: "Email", minWidth: 100 },
    { id: "mobile", label: "Mobile", minWidth: 100 },
    { id: "image", label: "Image", minWidth: 100,
      render: (row: CounsellorData) => (
        <img src={row.image} alt={row.name} style={{ width: 50, height: 50 }} />
      ),
     },
    { id: "country", label: "Country", minWidth: 100 },
    {
      id: "isApproved",
      label: "Approved",
      minWidth: 50,
      render: (row: CounsellorData) => (row.isApproved ? "Yes" : "No"),
    },
    
  ];
  return (
    <div className="flex flex-col">
      <div className="flex justify-end mt-3 gap-2">
      <div>
          <input
            type="text"
            placeholder="Search Counsellor"
            onChange={handleSearchChange}
            value={searchQuery}
            className="w-full max-w-xs p-2 border border-gray-400 rounded-md mb-3"
          />
        </div>
        <div>
          <Badge badgeContent={count} color="primary">
            <Button
              onClick={handleApprovalPage}
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
          title="Counsellors"
          columns={columns}
          data={filteredCounsellors}
        />
      </div>
    </div>
  );
};

export default CounsellorList;
