import {
  Box,
  Button,
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
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Interface/User/UserInterface";
import { api } from "../../../Api/api";
import { userApi } from "../../../Api/userApi";
import { toast } from "react-toastify";
import { signOutUser } from "../../../Redux/User/UserSlice";
import { useNavigate } from "react-router-dom";

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
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      const countries = await api.getAllCountries();
      if (countries) {
        setCountries(countries);
      }
    };

    const fetchEnrollments = async () => {
      const enrollments = await userApi.getAllEnrollments();
      if (enrollments) {
        setEnrollments(enrollments);
      } else {
        toast.error("failed to fetch enrollments");
      }
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
    ? Math.floor(parseFloat(selectedEnrollmentDetails.amount) + tax)
    : 0; // Handle undefined amount

  const handlePayment = async () => {
    const fetchedUser = await userApi.getAUser(user?.id);
    console.log(fetchedUser);

    if (fetchedUser?.isBlocked) {
      console.log("blocked");
      const response = await userApi.signOut();
      if (response) {
        dispatch(signOutUser());
        localStorage.removeItem("refreshToken");
        navigate("/signIn");
      }
    } else {
      console.log("not block");

      let stripe = await loadStripe(
        "pk_test_51PfgkcEAV82mMSI8Belvs1HZbtQMRdEst21OkbFOcgth5MRQVsQLjpvoIkKtKGrBlteQJbdrBmPH9gy6o28AwKj000T9mE7F4p"
      );
      console.log("strKey", import.meta.env.VITE_STRIPE_KEY);

      const body = {
        enrolldetails: selectedEnrollmentDetails,
        country: selectedCountry,
        userId: user?.id,
        totalAmount: totalAmount,
      };
      //creating checkout
      console.log("stripe....", stripe);

      const sessionId = await userApi.checkOut(body);
      if (sessionId) {
        const result = await stripe?.redirectToCheckout({
          sessionId: sessionId,
        });
        console.log("striperes", result);

        if (result && result.error) {
          console.log(result.error.message);
        }
      }
    }
  };
  return (
    <div className="flex flex-col lg:flex-row mb-10">
      {/* Left side: Form section */}
      <div className="flex flex-col lg:w-1/3 w-full ml-4 lg:ml-14 mt-8 bg-slate-200 rounded-lg p-4 shadow-lg">
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
              <h1 className="text-sm lg:text-lg mb-2">
                Selecting the option will provide a personalized interaction
                with country counsellor
              </h1>
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
            </RadioGroup>
          </FormControl>
        </Box>
      </div>

      {/* Conditionally render the summary section */}
      {selectedCountry && selectedEnrollment && selectedEnrollmentDetails && (
        <div className="lg:w-2/3 w-full mt-16 mx-auto">
          <div className="flex justify-center mt-3 bg-slate-500 mx-4 lg:mx-40 h-auto p-4 rounded-lg shadow-lg">
            <div className="flex flex-col w-full lg:w-3/4">
              <div>
                <h1 className="text-xl font-semibold mb-2 text-white">
                  Order Summary
                </h1>
              </div>
              <div className="flex flex-col mb-2">
                <div className="flex items-center mb-2">
                  <div className="mr-2">
                    <h1 className="font-medium text-white">Enrollment Name:</h1>
                  </div>
                  <div>
                    <h1 className="text-white">{selectedEnrollmentDetails.name}</h1>
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  <div className="mr-2">
                    <h1 className="font-medium text-white">Image:</h1>
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
                    <h1 className="font-medium text-white">Amount: Rs</h1>
                  </div>
                  <div>
                    <h1 className="text-white">{selectedEnrollmentDetails.amount}</h1>
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  <div className="mr-2">
                    <h1 className="font-medium text-white">Tax:</h1>
                  </div>
                  <div>
                    <h1 className="text-white">{tax}</h1>
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  <div className="mr-2">
                    <h1 className="font-medium text-white">Total Amount: Rs</h1>
                  </div>
                  <div>
                    <h1 className="text-white">{totalAmount}</h1>
                  </div>
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
