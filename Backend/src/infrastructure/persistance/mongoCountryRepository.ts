import { Country } from "../../domain/entities/country";
import { ICountryRepository } from "../../domain/repositories/ICountryRepository";
import countryModel from "../../presentation/models/countryModel";

export class mongoCountryRepository implements ICountryRepository {
  public async createCountry(country: Country): Promise<Country> {
    const createNewCountry = new countryModel({
      name: country.name,
      image: country.image,
    });
    const newCountry = await createNewCountry.save();
    return new Country(newCountry.id, newCountry.name, newCountry.image);
  }
  public async getAllCountries(): Promise<Country[]> {
    const countries = await countryModel.find();
    return countries.map(
      (country) =>
        new Country(country._id.toString(), country.name, country.image)
    );
  }
}
