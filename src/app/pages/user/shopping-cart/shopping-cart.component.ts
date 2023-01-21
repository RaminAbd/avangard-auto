import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { TranslateService } from '@ngx-translate/core';
import { CartItem } from 'src/app/models/CartItem.model';
import { Cart } from 'src/app/models/Cart.model';
import { OrdersService } from '../../../services/orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  userId: string = '';
  cart: Cart = new Cart();
  cols: any[] = [];
  constructor(
    private service: ShoppingCartService,
    private storage: LocalStorage,
    private translate: TranslateService,
    private ordersService: OrdersService,
    public router: Router
    ) { };

  ngOnInit(): void {
    this.storage.getItem('userInfo').subscribe((info: any) => {
      this.userId = info.id;
      this.GetShoppingCart(this.userId);
      this.setCols();
    });
  }

  GetShoppingCart(userId: string) {
    this.service.GetShoppingCart(userId, this.translate.currentLang).subscribe(resp => {
      this.cart = resp.data;
      this.cart.items = resp.data.items.map((item: any) => ({
        id: item.productId,
        image: item.image,
        name: item.name,
        price: item.price,
        qty: item.qty,
        cost: (item.qty * item.price),
        productCode: item.productCode
      }));
    })
  }
  setCols() {
    this.cols = [
      { field: 'image', header: 'Image', width: '150px' },
      { field: 'name', header: 'Title' },
      { field: 'productCode', header: 'Product ID' },
      { field: 'price', header: 'Price' },
      { field: 'qty', header: 'Quantity', width: '200px' },
      { field: 'cost', header: 'Cost', width: '100px' },
      { field: 'removeAction', header: 'Action', width: '100px' },
    ];
  }
  Action(e: any) {
    if (e.type === 'remove') {
      var arr: any[] = [];
      arr.push(e.data.id)
      var obj = {
        userId: localStorage.getItem('userId'),
        products: arr
      }
      this.service.RemoveFromCart(obj).subscribe(resp => {
        if (!resp.succeeded) {
          alert(resp.error);
        }
        this.GetShoppingCart(this.userId);
      })
    }
  }

  RowQtyUpdated(e: any) {
    var arr: any[] = [];
    var prod = {
      qty: e.qty,
      productId: e.id
    }
    arr.push(prod)
    var obj = {
      userId: localStorage.getItem('userId'),
      items: arr
    }
    this.service.UpdateShoppingCart(obj).subscribe(resp => {
      this.GetShoppingCart(this.userId)
    })
  }
  showOrderSuccess:boolean = false;
  CreateOrder(){
    this.ordersService.CreateOrder({userId: this.userId}).subscribe(resp => {
     this.showOrderSuccess = true;
     this.GetShoppingCart(this.userId)
    })
  }
}
