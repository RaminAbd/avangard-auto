import { Component, Input, EventEmitter, Output, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements AfterViewInit{
  @ViewChild('scrollContainer', { static: true }) scrollContainer: ElementRef;
  viewInitialized: boolean = false;
  Products: any[] = []
  @Input() set products(e: any) {
    this.Products = e;
    if(this.viewInitialized){
      this.scrollContainer.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  @Output() getProduct: any = new EventEmitter();
  @Output() addToCart: any = new EventEmitter();
  ngAfterViewInit(): void {
    this.viewInitialized = true;
  }
}
