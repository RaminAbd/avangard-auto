import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { ProductsForm } from 'src/app/models/ProductForm.model';
import { ProductsService } from 'src/app/services/products.service';
import { ChangeResponseForProducts } from '../../../Helpers/ChangeResponseForProducts';
import { TranslateService } from '@ngx-translate/core';
import { ProductDetail } from 'src/app/models/ProductDetail.model';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  private subscription: any;
  ProductId: string;
  Product: ProductDetail = new ProductDetail();
  shortProducts: ProductsForm[] = []
  constructor(
    private route: ActivatedRoute,
    private service: ProductsService,
    private cartService: ShoppingCartService,
    private router: Router,
    private translate: TranslateService,
    private messageService: MessageService,
  ) { this.ProductId = this.route.snapshot.paramMap.get('id') as string; };

  ngOnInit(): void {
    this.getProductById(this.ProductId);
    this.getAllProducts(this.translate.currentLang)
    this.subscription = this.translate.onLangChange.subscribe((lang) => {
      this.getProductById(this.ProductId);
      this.getAllProducts(this.translate.currentLang)
    });
  }

  getAllProducts(lang: any) {
    this.service.GetAll(`Products/GetAll/${lang}`).subscribe(resp => {
      var allProducts = ChangeResponseForProducts.ChangeResponseForProducts(resp, this.translate.currentLang);
      this.shortProducts = this.getRandomSubset(allProducts, 4);
    })
  }
  getRandomSubset(array: any[], subsetSize: number): any[]{
    const randomIndices = Array.from({ length: array.length }, (_, i) => i)
      .sort(() => Math.random() - 0.5)
      .slice(0, subsetSize);

    return randomIndices.map((index) => array[index]);
  };

  getProductById(id: string) {
    var obj = {
      ProductId: id,
      Lang: this.translate.currentLang
    };
    this.service.GetProductDetails(obj).subscribe(resp => {
      this.Product = resp.data;
      this.Product.qtyDescription = ChangeResponseForProducts.getQuantityDescription(this.Product, this.translate.currentLang);
      this.Product.qtyColor = ChangeResponseForProducts.getProductStatusColor(this.Product);
    })
  }

  addToCart(product: any) {
    product.cartLoading = true;
    var arr: any[] = [];
    var prod = {
      qty: product.qtyForCart,
      productId: product.id
    }
    arr.push(prod)
    var obj = {
      userId: localStorage.getItem('userId'),
      items: arr
    }
    this.cartService.UpdateShoppingCart(obj).subscribe(resp => {
      this.alert();
      product.addedToCart = true;
      product.cartLoading = false;
      setInterval(() => {
        product.addedToCart = false;
      }, 2000);
      product.qtyForCart = null;
    })
  }
  alert() {
    switch (this.translate.currentLang) {
      case 'ka-Geo':
        this.messageService.add({ severity: 'success', summary: 'წარმატებული', detail: 'პროდუქტი დამატებულია თქვენს კალათაში' });
        break;
      case 'ru-Ru':
        this.messageService.add({ severity: 'success', summary: 'Успешно', detail: 'Товар добавлен в Вашу корзину' });
        break;
      case 'en-Us':
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Item added to your cart' });
        break;
      default:
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Item added to your cart' });
        break;
    }
  }
  filter(e: any) {
    e.Lang = this.translate.currentLang;
    this.service.Filter(e).subscribe(resp => {
      var newArr = ChangeResponseForProducts.ChangeResponseForProducts(resp, this.translate.currentLang);
      this.shortProducts = newArr.slice(0, 4);
    })
  }

  getProduct(productId: string) {
    this.router.navigate(['user/products', productId]);
    this.getProductById(productId);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
