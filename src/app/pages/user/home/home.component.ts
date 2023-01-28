import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { Router } from '@angular/router';
import { ProductsForm } from 'src/app/models/ProductForm.model';
import { TranslateService } from '@ngx-translate/core';
import { ChangeResponseForProducts } from 'src/app/Helpers/ChangeResponseForProducts';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { PaginationObject } from '../../../models/PaginationObject.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscription: any;
  Products: ProductsForm[] = [];
  Response: PaginationObject = new PaginationObject();
  constructor(
    private productsService: ProductsService,
    private router: Router,
    private translate: TranslateService,
    private cartService: ShoppingCartService,
    private messageService: MessageService
  ) {
    this.subscription = this.translate.onLangChange.subscribe((lang) => {
      this.getAllProducts(this.translate.currentLang);
    });
  }

  ngOnInit(): void {
    this.getAllProducts(this.translate.currentLang);
  }

  getAllProducts(lang: any) {
    this.productsService.GetAll(`Products/GetAll/${lang}`).subscribe(resp => {
      this.Products = ChangeResponseForProducts.ChangeResponseForProducts(resp, this.translate.currentLang);
      this.GetAllWithPaging(1);
    })
  }

  GetAllWithPaging(e: any) {
    var pageSize = 8;
    this.Response.items = this.Products.slice((e - 1) * pageSize, e * pageSize);
    if (this.Products.length % pageSize !== 0) {
      this.Response.totalPages = Math.floor(this.Products.length / pageSize) + 1;
    }
    else {
      this.Response.totalPages = Math.floor(this.Products.length / pageSize);
    }
    (e > 1) ? this.Response.hasPrevious = true : this.Response.hasPrevious = false;
    (e < this.Response.totalPages) ? this.Response.hasNext = true : this.Response.hasNext = false;
    this.Response.currentPage = e;
  }

  addToCart(product: ProductsForm) {
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
      this.alert()
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
    this.productsService.Filter(e).subscribe(resp => {
      this.Products = ChangeResponseForProducts.ChangeResponseForProducts(resp, this.translate.currentLang);

      this.GetAllWithPaging(1);
    })
  }

  getProduct(productId: string) {
    this.router.navigate(['user/products', productId]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
