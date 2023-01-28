import { LangType } from "./LangType.interface";

export class ChangeResponseForOrders {
  public static ChangeResponseForOrders(data: any[], lang: any) {
    return data.map((item: any) => ({
      id: item.id,
      createdAt: new Date(item.createdAt).toLocaleDateString(),
      amountOfItems: item.amountOfItems,
      orderCode: item.orderCode,
      status: this.getOrderStatus(item.status, lang),
      statusColor: this.getOrderStatusColor(item.status),
      totalPrice: item.totalPrice,
    }));
  }

  public static getOrderStatus(value: number, lang: any) {

    switch (value) {
      case 1: return this.getOrderStatusByLang().pending[lang as keyof LangType];
      case 2: return this.getOrderStatusByLang().progress[lang as keyof LangType];
      case 3: return this.getOrderStatusByLang().rejected[lang as keyof LangType];
      case 4: return this.getOrderStatusByLang().accepted[lang as keyof LangType];
      case 5: return this.getOrderStatusByLang().completed[lang as keyof LangType];
      default: return 'unknown';
    }
  }

  public static getOrderStatusByLang() {
    var obj = {
      pending: { 'ka-Geo': 'მომლოდინე', 'en-Us': 'Pending', 'ru-Ru': 'В ожидании' },
      progress: { 'ka-Geo': 'პროგრესირებს', 'en-Us': 'In progress', 'ru-Ru': 'Выполняется' },
      rejected: { 'ka-Geo': 'უარყოფილია', 'en-Us': 'Rejected', 'ru-Ru': 'Отклонено' },
      accepted: { 'ka-Geo': 'მიღებულია', 'en-Us': 'Accepted', 'ru-Ru': 'Принято' },
      completed: { 'ka-Geo': 'დასრულებულია', 'en-Us': 'Completed', 'ru-Ru': 'Выполнено' },
    }
    return obj;
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
