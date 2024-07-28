import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL, URL } from "../../../Constants/Constants";
import {useStripe} from "@stripe/react-stripe-js" 
import {loadStripe} from "@stripe/stripe-js"
import { useSelector } from "react-redux";
import { RootState } from "../../../Interface/User/UserInterface";

interface CountryData {
  id: string;    
  name: string;
  image: string;
}

interface EnrollmentData {
  id: string;
  name: string;
  amount: string;
  image: string;
}

const Enrollment = () => {
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [enrollments, setEnrollments] = useState<EnrollmentData[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>(""); // State for selected country
  const [selectedEnrollment, setSelectedEnrollment] = useState<string>(""); // State for selected enrollment
  const {user} = useSelector((state:RootState)=>state.user)
  useEffect(() => {
    const fetchCountries = async () => {
      const response = await axios.get(`${URL}/countries`);
      if (response.status === 200) {
        const countries = response.data.data;
        setCountries(countries);
      }
    };

    const fetchEnrollments = async () => {
      const response = await axios.get(`${BASE_URL}/enrollments`, {
        withCredentials: true,
      });

      console.log(response.data);
      const enrollmentData = response.data.data;
      setEnrollments(enrollmentData);
    };

    fetchCountries();
    fetchEnrollments();
  }, []);

  const handleCountrySelectChange = (event: SelectChangeEvent<string>) => {
    setSelectedCountry(event.target.value as string);
  };

  const handleEnrollmentSelectChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedEnrollment(event.target.value);
  };

  const selectedEnrollmentDetails = enrollments.find(
    (enroll) => enroll.id === selectedEnrollment
  );


  // Calculate tax function
  const calculateTax = (amount: string | undefined): number => {
    if (!amount) {
      // If amount is undefined or invalid, return 0
      return 0;
    }

    const newAmount = parseFloat(amount);

    // Check if newAmount is a valid number
    if (isNaN(newAmount)) {
      return 0;
    }
    // Calculate tax as 8% of the amount
    const tax = (8 / 100) * newAmount;
    return tax;
  };
  const tax = calculateTax(selectedEnrollmentDetails?.amount);
  const totalAmount = selectedEnrollmentDetails
    ?Math.floor(parseFloat(selectedEnrollmentDetails.amount) + tax)
    : 0; // Handle undefined amount

    const handlePayment = async()=>{
        const stripe = await loadStripe("pk_test_51PfgkcEAV82mMSI8Belvs1HZbtQMRdEst21OkbFOcgth5MRQVsQLjpvoIkKtKGrBlteQJbdrBmPH9gy6o28AwKj000T9mE7F4p")
         const body={
            enrolldetails:selectedEnrollmentDetails,
            country:selectedCountry,
            userId:user?.id,
            totalAmount:totalAmount
           }
           const headers={
            "Content-Type":"application/json"
           }

           const response = await fetch(`${BASE_URL}/create-checkout`,{
            method:"POST",
            headers:headers,
            body:JSON.stringify(body),
            credentials:"include"
           })
           
           
           const session = await response.json()
           if (stripe) {
            
            const result = await stripe.redirectToCheckout({
              sessionId: session.id,
            });
      
            if (result && result.error) {
              console.log(result.error.message);
            }
    }
  }
  return (
    <div className="flex">
      <div className="flex flex-col w-1/3 ml-14 mt-8 bg-slate-200 rounded-lg p-4 shadow-lg">
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="country-select-label">
              Select The Country
            </InputLabel>
            <Select
              labelId="country-select-label"
              id="country-select"
              value={selectedCountry}
              label="Country"
              onChange={handleCountrySelectChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {countries?.map((country) => (
                <MenuItem key={country.id} value={country.id}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ mt: 8 }}>
          <FormControl>
            <FormLabel id="enrollment-radio-buttons-group">
              Select Any One Option
            </FormLabel>
            <RadioGroup
              aria-labelledby="enrollment-radio-buttons-group"
              name="enrollment-radio-buttons-group"
              value={selectedEnrollment}
              onChange={handleEnrollmentSelectChange}
            >
              <h1 className="text-lg">
                Selecting the option will provide a personalised interaction
                with country counsellor
              </h1>
              <Box sx={{ mt: 3, flexDirection: "column" }}>
                <Box sx={{ mt: 3, flexDirection: "column" }}>
                  {enrollments?.map((enroll) => (
                    <FormControlLabel
                      key={enroll.id}
                      value={enroll.id}
                      control={<Radio />}
                      label={enroll.name}
                    />
                  ))}
                </Box>
              </Box>
            </RadioGroup>
          </FormControl>
        </Box>
      </div>

      {/* Conditionally render the summary section */}
      {selectedCountry && selectedEnrollment && selectedEnrollmentDetails && (
        <div className="w-2/3 mt-16">
          <div className="flex justify-center mt-3 bg-slate-500 ml-40 mr-16 h-auto p-4 rounded-lg shadow-lg">
            <div className="flex flex-col">
              <div>
                <h1 className="text-xl font-semibold mb-2">Order Summary</h1>
              </div>
              <div className="flex items-center mb-2">
                <div className="mr-2">
                  <h1 className="font-medium">Enrollment Name:</h1>
                </div>
                <div>
                  <h1>{selectedEnrollmentDetails.name}</h1>
                </div>
              </div>
              <div className="flex items-center mb-2">
                <div className="mr-2">
                  <h1 className="font-medium">Image:</h1>
                </div>
                <div>
                  <img
                    src={selectedEnrollmentDetails.image}
                    alt={selectedEnrollmentDetails.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </div>
              </div>
              <div className="flex items-center mb-2">
                <div className="mr-2">
                  <h1 className="font-medium">Amount:Rs</h1>
                </div>
                <div>
                  <h1>{selectedEnrollmentDetails.amount}</h1>
                </div>
              </div>
              <div className="flex items-center mb-2">
                <div className="mr-2">
                  <h1 className="font-medium">Tax:</h1>
                </div>
                <div>
                  <h1>{tax}</h1>
                </div>
              </div>
              <div className="flex items-center mb-2">
                <div className="mr-2">
                  <h1 className="font-medium">Total Amount: Rs</h1>
                </div>
                <div>
                  <h1>{totalAmount}</h1>
                </div>
              </div>
              <div className="mt-4">
                <Button
                  onClick={handlePayment}
                  variant="contained"
                  color="primary"
                >
                  Continue Payment
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Enrollment;
