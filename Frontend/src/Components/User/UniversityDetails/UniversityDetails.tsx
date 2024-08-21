import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { api } from "../../../Api/api";

interface CountryData {
  id: string;
  name: string;
  image: string;
}

interface UniversityData {
  _id: string;
  name: string;
  address: string;
  ranking: string;
  country: CountryData;
  logo: string;
  images: string[];
  isApproved: boolean;
}

const UniversityDetails = () => {
  const location = useLocation();
  const universityId = location.state?.universityId;
  const navigate = useNavigate();
  // const {universityId} = useParams()
  const [university, setUniversity] = useState<UniversityData>();

  useEffect(() => {
    try {
      if (universityId) {
        const getUniversityDetails = async () => {
          const university = await api.getUniversityDetails(universityId);
          if (university) {
            setUniversity(university);
          }
        };
        getUniversityDetails();
      } else {
        navigate("/universities");
      }
    } catch (error) {
      console.log(error);
    }
  }, [universityId]);
  return (
    <section>
      <div className="flex justify-center">
        <div className="w-2/3 h-auto bg-indigo-200 mt-5 rounded-md">
          <div className="flex p-5">
            <div className="max-w-48">
              <img
                className="rounded-lg shadow-md"
                src={university?.logo}
                alt=""
              />
            </div>
            <div className="flex items-center ml-10">
              <h1 className="text-3xl font-bold">{university?.name}</h1>
            </div>
          </div>

          <div className="flex flex-col p-3">
            <div className="max-w-2xl">
              <p>Address: {university?.address}</p>
            </div>
            <div>
              <p>Country: {university?.country.name}</p>
            </div>
            <div>
              <p>Ranking: {university?.ranking}</p>
            </div>
            {/* <div>
          <p>Qualification: {course?.qualification}</p>
        </div> */}
          </div>
        </div>
      </div>
      {/* {university?.images.map((image)=>{
        return <div className="flex lg:w-1/3">
            <img src={image} alt="" />
        </div>
      })} */}
      <div className="flex justify-center mt-8 border">
        <ImageList sx={{ width: 650, height: 450 }} cols={2} rowHeight={180}>
          {(university?.images || []).map((image, index) => (
            <ImageListItem key={index}>
              <img
                srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`${image}?w=164&h=164&fit=crop&auto=format`}
                alt={university?.name}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </section>
  );
};

export default UniversityDetails;
