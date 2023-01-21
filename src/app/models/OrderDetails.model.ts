import { OrderItem } from "./OrderItem.model";
import { OrderUserInfo } from './OrderUserInfo.model';

export class OrderDetails {
  user: OrderUserInfo;
  items: OrderItem[]=[];
  id: string;
  orderCode: string;
  createdAt: any;
  amountOfItems: number;
  totalPrice: number;
  status: any;
  statusColor:any;
  selectedTotalPrice:number;
}
