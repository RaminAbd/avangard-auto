export class ChangeResponseForProducts {
  public static ChangeResponseForProducts(resp: any) {
    return resp.data.map((item: any) => ({
      id: item.id,
      name: item.name,
      productCode: item.productCode,
      price: item.price,
      qty: item.qty,
      image: item.image,
      engine: item.engine,
      applicationCarManufacturer: item.applicationCarManufacturer,
      carType: item.carType,
      partManufacturer: item.partManufacturer,
      years: item.years,
      qtyColor: this.getProductStatusColor(item),
      qtyDescription: this.getQuantityDescription(item),
      baseData: item,
    }));
  }
  public static getQuantityDescription(product: any) {
    if (product.qty !== 0 && product.qty < 30) {
      return 'Products < 30'
    }
    else if (product.qty === 0) {
      return 'Discontinued'
    }
    else if (product.qty > 30) {
      return 'In stock'
    }
    else {
      return 'Error'
    }
  }
  public static getProductStatusColor(product: any) {
    if (product.qty !== 0 && product.qty < 30) {
      return '#FFC149';
    }
    else if (product.qty === 0) {
      return '#FD3333';
    }
    else if (product.qty > 30) {
      return '#00AF70';
    }
    else {
      return '#fff'
    }
  }
}
