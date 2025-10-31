import { Component } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {ProductsForm} from "../../../../models/ProductForm.model";

@Component({
  selector: 'app-product-name-dialog',
  templateUrl: './product-name-dialog.component.html',
  styleUrls: ['./product-name-dialog.component.scss']
})
export class ProductNameDialogComponent {
  Product: ProductsForm = new ProductsForm();

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.Product = this.config.data;
  }
  Update(){
    this.ref.close(this.Product)
  }
}
