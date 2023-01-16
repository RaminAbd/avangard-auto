import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  @Input() Products:any[];
  @Output() getProduct:any = new EventEmitter();
  @Output() addToCart:any = new EventEmitter();
}
