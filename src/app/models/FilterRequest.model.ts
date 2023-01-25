export class FilterRequest{
  ApplicationCarManufacturerIds:string[]=[];
  CarTypeIds:string[]=[];
  PartManufacturerIds:string[]=[];
  ModelIds:string[]=[];
  Lang:string;
  SearchText?:string;
  From?:any;
  To?:any;
}
