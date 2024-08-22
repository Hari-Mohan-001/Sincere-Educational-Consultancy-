import { Request, Response } from "express";
import { mongoCountryRepository } from "../persistance/mongoCountryRepository";
import { cloudinaryUpload } from "../services/CloudinaryUpload";
import { addNewCountry } from "../../application/use-cases/Country/createCountry";
import { getCountries } from "../../application/use-cases/Country/getAllCountry";

const countryRepository = new mongoCountryRepository();

const countryControler = () => {
  const addCountry = async (req: Request, res: Response) => {
    const { name, image } = req.body;

    try {
      const imageUploadUrl = await cloudinaryUpload(image, "Country");
      const saveCountry = await addNewCountry(countryRepository).execute(
        name,
        imageUploadUrl
      );
      if (saveCountry) {
        res.status(200).json({ message: "country added successfully" });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "An unknown error occurred" });
      }
    }
  };
  const getAllCountries = async (req: Request, res: Response) => {
    try {
      const data = await getCountries(countryRepository).execute();
      res.status(200).json({ message: "success", data });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "An unknown error occurred" });
      }
    }
  };
  return {
    addCountry,
    getAllCountries,
  };
};

export default countryControler;
