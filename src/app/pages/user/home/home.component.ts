import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { Router } from '@angular/router';
import { ProductsForm } from 'src/app/models/ProductForm.model';
import { TranslateService } from '@ngx-translate/core';
import { ChangeResponseForProducts } from 'src/app/Helpers/ChangeResponseForProducts';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscription: any;
  Products: ProductsForm[] = [];
  constructor(
    private productsService: ProductsService,
    private router: Router,
    private translate: TranslateService,
    private cartService: ShoppingCartService
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
      this.Products = ChangeResponseForProducts.ChangeResponseForProducts(resp);
    })
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
      product.addedToCart = true;
      product.cartLoading = false;
      setInterval(() => {
        product.addedToCart = false;
      }, 2000);
      product.qtyForCart = null;
    })
  }

  filter(e: any) {
    this.productsService.Filter(e).subscribe(resp => {
      this.Products = ChangeResponseForProducts.ChangeResponseForProducts(resp);
    })
  }

  getProduct(productId: string) {
    this.router.navigate(['user/products', productId]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
