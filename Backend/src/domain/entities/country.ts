// interface CountryParams {
//   id: string;
//   name: string;
//   image: string;
// }

// export function Country({ id, name, image }: CountryParams) {
//   return {
//     id,
//     name,
//     image,
//   };
// }
export class Country {
    constructor(
        public id: string,
        public name: string,
        public image: string
    ) {}
}