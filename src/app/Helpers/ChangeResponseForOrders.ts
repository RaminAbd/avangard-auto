export class ChangeResponseForOrders {
  public static ChangeResponseForOrders(data: any[]) {
    return data.map((item: any) => ({
      id: item.id,
      createdAt: new Date(item.createdAt).toLocaleDateString(),
      amountOfItems: item.amountOfItems,
      orderCode: item.orderCode,
      status: this.getOrderStatus(item.status),
      statusColor: this.getOrderStatusColor(item.status),
      totalPrice: item.totalPrice,
    }));
  }
  public static getOrderStatus(value: number) {
    switch (value) {
      case 1: return 'pending';
      case 2: return 'in progress';
      case 3: return 'rejected';
      case 4: return 'accepted';
      case 5: return 'completed';
      default: return 'unknown';
    }
  }
  public static getOrderStatusColor(value: number) {
    switch (value) {
      case 1: return '#FFC149';
      case 2: return '#2F4550';
      case 3: return '#FD3333';
      case 4: return '#008E5B';
      case 5: return '#000000';
      default: return 'unknown';
    }
  }
}
