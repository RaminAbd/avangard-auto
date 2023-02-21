import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  private subscription:any;
  Products: any[] = []
  cols: any[] = [];
  correlationPercentage:number = 0;
  correlationTypes:any[] = [
    {key:0, nameKa:'გაზრდა', nameRu:'Поднимать', name:'Raise'},
    {key:1, nameKa:'შემცირება', nameRu:'Снизить', name:'Reduce'}
  ];
  selectedCorrelationType:any;
  loading:boolean = false;
  constructor(
    private service: ProductsService,
    private router: Router,
    public translate: TranslateService
    ) { };
  ngOnInit() {
    this.GetAll();
    this.setCols();
    this.subscription = this.translate.onLangChange.subscribe((lang) => {
      this.GetAll();
    });
  }
  Calculate(){
    var obj = {
      'correlattion': this.correlationPercentage,
      'type': this.selectedCorrelationType.key,
    };
    this.service.Correlate(obj).subscribe(resp=>{
      this.correlationPercentage = 0;
      this.GetAll();
    })
  }
  GetAll() {
    this.loading = true;
    this.service.GetAll(`Products/GetAll/${this.translate.currentLang}`).subscribe(resp => {
    this.loading = false;
    this.Products = resp.data;
    })
  }
  Create() {
    this.router.navigate(['admin/products', 'create']);
  }
  setCols() {
    this.cols = [
      { field: 'image', header: 'Image', width: '150px' },
      { field: 'name', header: 'Name' },
      { field: 'productCode', header: 'ProductID' },
      { field: 'price', header: 'Price', width: '300px' },
      { field: 'qty', header: 'Quantity', width: '300px' },
      { field: 'crudActions', header: 'Action', width: '150px' },
    ];
  }
  SearchText: any;
  SearchTextForTable: any;
  Search() {
    this.SearchTextForTable = this.SearchText;
  }
  Action(e: any) {
    if (e.type === 'edit') {
      this.router.navigate(['admin/products', e.data.id])
    }
    else {
      this.service.Delete('Products/DeleteProduct/', e.data.id).subscribe(resp => {
        if (!resp.succeeded) {
          alert(resp.error);
        }
        this.GetAll();
      })
    }
  }
  RowQtyUpdated(e:any){
    var obj = {
      productId: e.id,
      qty:e.qty
    }
    this.service.UpdateProductQty(obj).subscribe(resp=>{})
  }
  RowPriceUpdated(e:any){
    var obj = {
      id: e.id,
      price:e.price
    }
    this.service.UpdateProductPrice(obj).subscribe(resp=>{})
  }
  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
}
