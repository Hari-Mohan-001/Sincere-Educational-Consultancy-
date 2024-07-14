// interface CountryParams {
//   id: string;
//   name: string;
//   image: string;
// }

import { ObjectId } from "mongoose";

// export function Country({ id, name, image }: CountryParams) {
//   return {
//     id,
//     name,
//     image,
//   };
// }
export class Country {
    constructor(
        public id: string|ObjectId,
        public name: string,
        public image: string
    ) {}
}