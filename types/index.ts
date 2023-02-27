import {scalarOptions} from "yaml";

export interface IBook {
    _id?: string;
    title: string;
    isbn: string;
    pageCount: number;
    published: string;
    author: IAuthor;
}

export interface IAuthor {
    name: string;
    _id?: string;
}
//
// type Person = {
//     readonly name: string;
//     age?: number;
// }
//
// const getName = (firstname: string | number) => {
//     return typeof firstname === "string" ? firstname.toUpperCase(): String(firstname).toUpperCase();
// };
//
// type name = {
//     name: string;
//     getName: () => string;
//     setName: (name: string) => void
// };
//
// interface Animal {
//     isAnimal: true
// }
// interface person extends Animal{
//     name: string;
//     getName: () => string;
//     setName: (name: string) => void
// }
//
//
// type Pick<First extends object, Demand extends keyof First> = {
//     [L in Demand]: First[L]
// };
//
// type Demand = 'name' | 'marks';
//
// type x = Pick<First, Demand>
//
// const Picking: Pick<First, Demand> = {
//     name: 'name',
//     marks: 343,
// }
//
// type First = {
//     name: string;
//     age: number;
//     marks: number;
// }
//
//
//
