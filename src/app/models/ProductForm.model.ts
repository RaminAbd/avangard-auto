import { Multilingual } from './Multilingual.model';
export class ProductsForm{
  name: Multilingual;
  price: number;
  code?: any;
  image?: any;
  qty: number;
  engine?: any;
  applicationCarManufacturerId?: any;
  carTypeId?: any;
  partManufacturerId?: any;
  modelId?:any;
  years: any[];
  id?: any;
  qtyForCart?:number | null;
  productCode?:any;
  qtyColor?:any;
  qtyDescription:any;
  addedToCart?:boolean = false;
  cartLoading?:boolean = false;
}
