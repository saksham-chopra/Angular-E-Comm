export default interface Product{
    id:number;
    brand:string;
    image: string;
    currentPrice:string;
    standardPrice:string;
    discount:string;
    name:string;

    quantity?:number;
}