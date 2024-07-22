import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { URL } from "../../../Constants/Constants";

interface CountryData{
    id:string,
    name:string,
    image:string
}

const Enrollment = () => {
    const [countries, setCountries] = useState<CountryData[]>([])
    useEffect(()=>{
        const fetchCountries = async()=>{
            const response = await axios.get(`${URL}/countries`)
            if(response.status===200){
                const countries = response.data.data
                setCountries(countries)
            }
        }
        fetchCountries()
    },[])

    const handleSelectChange = ()=>{

    }
  return (
    <div className="flex">
      <div className="flex flex-col w-1/3 ml-14 mt-8 bg-slate-200 rounded-lg p-4 shadow-lg">
      {/* <h1>Choose the country</h1> */}
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Select The Country
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="Country"
                onChange={handleSelectChange}
            >
                {/* <MenuItem value="">
                  <em>None</em>
                </MenuItem> */}
             {countries?.map((country) => {
                  return <MenuItem key={country.id} value={country.id}>{country.name}</MenuItem>;
                })}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{mt:8}}>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
             Select Any one option
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              // value={value}
              // onChange={handleChange}
            >
              <Box sx={{mt:3}}>
                <h1 className="text-lg">
                  Selecting this option will provide a personalised chat with
                  country counsellor
                  <span className="text-xl font-bold"> at Rs.99 only</span>
                </h1>
                <FormControlLabel
                  value="chat"
                  control={<Radio />}
                  label="Chat"
                />
              </Box>
              <Box sx={{mt:2}}>
                <h1 className="text-lg">
                  Selecting this option will provide a personalised video chat
                  with country Counsellor
                  <span className="text-xl font-bold"> at Rs.199 only</span>
                </h1>
                <FormControlLabel
                  value="videoChat"
                  control={<Radio />}
                  label="Video Chat"
                />
              </Box>
            </RadioGroup>
          </FormControl>
        </Box>
      </div>
    </div>
  );
};

export default Enrollment;
