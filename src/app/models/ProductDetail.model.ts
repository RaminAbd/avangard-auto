export class ProductDetail{
  id: string;
  productCode: string;
  name: string;
  price: number;
  qty: number;
  image: string;
  engine: string;
  model?:any;
  applicationCarManufacturer?: any;
  carType?: any;
  partManufacturer?: any;
  years: number[];
  qtyDescription?:any;
  qtyColor?:any;
  qtyForCart?:number | null;
  addedToCart?:boolean = false;
  cartLoading?:boolean = false;
}
