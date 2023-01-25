export class ChangeResponseForProducts {

  public static ChangeResponseForProducts(resp: any, lang: any) {
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
      qtyDescription: this.getProductStatusByLang(item),
      baseData: item,
    }));
  }

  public static getQuantityDescription(product: any, lang: any) {
    if (product.qty !== 0 && product.qty < 30) {
      return this.getProductStatusByLang(lang).first;
    }
    else if (product.qty === 0) {
      return this.getProductStatusByLang(lang).second;
    }
    else if (product.qty > 30) {
      return this.getProductStatusByLang(lang).third;
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

  public static getProductStatusByLang(lang: any) {
    var obj = {
      first: '',
      second: '',
      third: ''
    };
    switch (lang) {
      case 'ru-Ru': {
        obj = {
          first: 'Продуктов < 30',
          second: 'Снято с производства',
          third: 'В наличии'
        };
        return obj
      }
      case 'ka-Geo': {
        obj = {
          first: 'პროდუქტები < 30',
          second: 'შეწყდა',
          third: 'Საწყობში'
        };
        return obj
      }
      case 'en-Us': {
        obj = {
          first: 'Products < 30',
          second: 'Discontinued',
          third: 'In stock'
        };
        return obj
      }
      default:
        return obj
    }
  }
}
