import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  Products: any[] = []
  cols: any[] = [];
  constructor(private service: ProductsService, private router: Router) { };
  ngOnInit() {
    this.GetAll();
    this.setCols();
  }
  GetAll() {
    this.service.GetAll('Products/GetAll/ka-Geo').subscribe(resp => {
      this.Products = resp.data;
    })
  }
  Create() {
    this.router.navigate(['admin/products', 'create']);
  }
  setCols() {
    this.cols = [
      { field: 'image', header: 'Image', width: '150px' },
      { field: 'name', header: 'Title' },
      { field: 'productCode', header: 'Product ID' },
      { field: 'price', header: 'Price' },
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
}
