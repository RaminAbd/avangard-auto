import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ProductNameDialogComponent } from './product-name-dialog/product-name-dialog.component';
import { FileService } from '../../../services/file.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  private subscription: any;
  Products: any[] = [];
  cols: any[] = [];
  correlationPercentage: number = 0;
  correlationTypes: any[] = [
    { key: 0, nameKa: 'გაზრდა', nameRu: 'Поднимать', name: 'Raise' },
    { key: 1, nameKa: 'შემცირება', nameRu: 'Снизить', name: 'Reduce' },
  ];
  selectedCorrelationType: any;
  loading: boolean = false;
  showCorrelation: boolean = false;
  constructor(
    private service: ProductsService,
    private router: Router,
    public translate: TranslateService,
    private dialog: DialogService,
    private messageService: MessageService,
  ) {}
  ngOnInit() {
    this.GetAll();
    this.setCols();
    this.subscription = this.translate.onLangChange.subscribe((lang) => {
      this.GetAll();
    });
  }
  Calculate() {
    var obj = {
      correlattion: this.correlationPercentage,
      type: this.selectedCorrelationType.key,
    };
    this.service.Correlate(obj).subscribe((resp) => {
      this.correlationPercentage = 0;
      this.GetAll();
    });
  }
  showCorrelateinputs() {
    this.showCorrelation = true;
  }
  GetAll() {
    this.loading = true;
    this.service
      .GetAll(`Products/GetAll/${this.translate.currentLang}`)
      .subscribe((resp) => {
        this.loading = false;
        this.Products = resp.data.map((product: any) => ({
          ...product,
        }));
      });
  }
  Create() {
    this.router.navigate(['admin/products', 'create']);
  }
  setCols() {
    this.cols = [
      { field: 'image', header: 'Image', width: '150px' },
      { field: 'name', header: 'Name' },
      { field: 'productCode', header: 'ProductID', width: '260px' },
      { field: 'price', header: 'Price', width: '150px' },
      { field: 'qty', header: 'Quantity', width: '150px' },
      { field: 'innerCode', header: 'Inner code', width: '150px' },
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
      this.router.navigate(['admin/products', e.data.id]);
    } else {
      this.service
        .Delete('Products/DeleteProduct/', e.data.id)
        .subscribe((resp) => {
          if (!resp.succeeded) {
            alert(resp.error);
          }
          this.GetAll();
        });
    }
  }
  RowQtyUpdated(e: any) {
    var obj = {
      productId: e.id,
      qty: e.qty,
    };
    this.service.UpdateProductQty(obj).subscribe((resp) => {});
  }
  RowPriceUpdated(e: any) {
    var obj = {
      id: e.id,
      price: e.price,
    };
    this.service.UpdateProductPrice(obj).subscribe((resp) => {});
  }

  RowCodeUpdated(e: any) {
    var obj = {
      id: e.id,
      code: e.productCode,
    };
    this.service.UpdateProductCode(obj).subscribe((resp) => {});
  }

  RowInnerCodeUpdated(e: any) {
    var obj = {
      id: e.id,
      innerCode: e.innerCode,
    };
    this.service.UpdateProductInnerCode(obj).subscribe((resp) => {});
  }

  getProductDetails(e: any) {
    this.service.GetById('Products/GetProduct/', e.id).subscribe((resp) => {
      console.log(resp.data);
      this.openNameDialog(resp.data);
    });
  }

  openNameDialog(item: any) {
    const ref = this.dialog.open(ProductNameDialogComponent, {
      header: 'Name',
      width: '500px',
      style: {
        maxWidth: '95%',
      },
      data: item,
    });
    ref.onClose.subscribe((e: any) => {
      if (e) {
        this.updateProductName(e);
      }
    });
  }

  updateProductName(e: any) {
    this.service.UpdateProductName(e).subscribe((resp) => {
      this.GetAll();
    });
  }

  exportProductsExcel() {
    this.service
      .ConvertToExcel(this.translate.currentLang)
      .subscribe((blob: Blob) => {
        const file = new Blob([blob], { type: '.xlsx' });
        const fileURL = URL.createObjectURL(file);
        var a = document.createElement('a');
        a.href = fileURL;
        a.target = '_blank';
        a.download = 'products.xlsx';
        document.body.appendChild(a);
        a.click();
      });
  }

  incomingsLoading: boolean = false;
  IncomingsUploadSuccess: boolean = false;
  chooseFile(event: any) {
    this.incomingsLoading = true;
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const fd = new FormData();
      fd.append('file', files[i]);
      this.service.ImportIncoming(fd).subscribe((resp: any) => {
        this.incomingsLoading = false;
        this.IncomingsUploadSuccess = true;
        setInterval(() => {
          this.IncomingsUploadSuccess = false;
        }, 2000);
        if (!resp.succeeded) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: resp.error,
          });
        } else {
          this.GetAll();
        }
      });
    }
  }

  outgoingsLoading: boolean = false;
  OutgoingsUploadSuccess: boolean = false;
  chooseOutgoingFile(event: any) {
    this.outgoingsLoading = true;
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const fd = new FormData();
      fd.append('file', files[i]);
      this.service.ImportOutgoing(fd).subscribe((resp: any) => {
        console.log(resp);
        this.outgoingsLoading = false;
        this.OutgoingsUploadSuccess = true;
        setInterval(() => {
          this.OutgoingsUploadSuccess = false;
        }, 2000);
        if (!resp.succeeded) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: resp.error,
          });
        } else {
          this.GetAll();
        }
      });
    }
  }

  newProductsLoading: boolean = false;
  newProductsUploadSuccess: boolean = false;
  chooseNewProductsFile(event: any) {
    this.newProductsLoading = true;
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const fd = new FormData();
      fd.append('file', files[i]);
      this.service.ImportNewProducts(fd).subscribe((resp: any) => {
        console.log(resp);
        this.newProductsLoading = false;
        this.newProductsUploadSuccess = true;
        setInterval(() => {
          this.newProductsUploadSuccess = false;
        }, 2000);
        if (!resp.succeeded) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: resp.error,
          });
        } else {
          this.GetAll();
        }
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
