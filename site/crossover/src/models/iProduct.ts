﻿import ICategory from "./ICategory";

export default interface IProduct{
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: ICategory;
}