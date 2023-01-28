import { ChangeResponseForOrders } from './ChangeResponseForOrders';
export class ChangeResponseForOrderDetails {
  public static ChangeResponseForOrderDetails(data: any, lang:any) {
    var newObject = {
      id: data.id,
      statusCode:data.status,
      amountOfItems: data.amountOfItems,
      createdAt: new Date(data.createdAt).toLocaleDateString(),
      orderCode: data.orderCode,
      status: ChangeResponseForOrders.getOrderStatus(data.status, lang),
      statusColor: ChangeResponseForOrders.getOrderStatusColor(data.status),
      totalPrice: data.totalPrice,
      selectedTotalPrice:0,
      user: data.user,
      items: data.items.map((item: any) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        productCode: item.productCode,
        qty: item.qty,
        status: ChangeResponseForOrders.getOrderStatus(item.status, lang),
        statusColor: ChangeResponseForOrders.getOrderStatusColor(item.status),
      }))

    };
    return newObject;
  }
}
