import { CategoryType } from './CategoryType.model';
export class CarManufacturer{
  id: string;
  name: string;
  types: CategoryType[]=[];
}
