import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsForm } from '../../../../models/ProductForm.model';
import { BaseCrudService } from '../../../../services/base-crud.service';
import { TypesService } from '../../../../services/types.service';
import { PartManufacturerService } from '../../../../services/part-manufacturer.service';
import { FileService } from '../../../../services/file.service';
import { formatDate } from '@angular/common';
import { CarManufacturer } from '../../../../models/CarManufacturer.model';
import { Dropdown } from 'primeng/dropdown';
import { Calendar } from 'primeng/calendar';
import { ModelsService } from 'src/app/services/models.service';
import { MessageService } from 'primeng/api';
import { LanguagedErrorHandler } from '../../../../Helpers/LanguagedErrorHandler';
import { LangType } from 'src/app/Helpers/LangType.interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-products-upsert',
  templateUrl: './admin-products-upsert.component.html',
  styleUrls: ['./admin-products-upsert.component.scss']
})
export class AdminProductsUpsertComponent implements OnInit {
  ProductId: string;
  Product: ProductsForm = new ProductsForm();
  CarManufacturers: any[] = []
  selectedCarManufacturer: CarManufacturer = new CarManufacturer();
  AllTypes: any[] = []
  Types: any[] = [];
  selectedType: any;
  PartManufacturers: any[] = [];
  selectedPartManufacturer: any;
  SelectedDates: any[] = [];
  Image: any;
  Models: any[] = [];
  selectedModel: any;
  showDatePicker: boolean = false;
  constructor(
    private service: ProductsService,
    private route: ActivatedRoute,
    private baseCrudService: BaseCrudService,
    private modelsService: ModelsService,
    private partManufacturerService: PartManufacturerService,
    private fileService: FileService,
    private router: Router,
    private messageService: MessageService,
    private translate:TranslateService
  ) {
    this.ProductId = this.route.snapshot.paramMap.get('type') as string;
    this.getCarManufacturers();
    this.getPartManufacturers()
  }

  ngOnInit(): void {
    if(this.ProductId === 'create') this.showDatePicker = true;
  }

  getPartManufacturers() {
    this.partManufacturerService.GetAll('PartManufacturers/GetManufacturers', null).subscribe(resp => {
      this.PartManufacturers = resp.data;
    })
  }

  getCarManufacturers() {
    this.baseCrudService.GetAll('Manufacturers/GetManufacturers/ka-Geo').subscribe(resp => {
      this.CarManufacturers = resp.data;
      if (this.ProductId === 'create') {
        this.GetForm();
      }
      else {
        this.getProduct(this.ProductId);
      }
    })
  }


  GetForm() {
    this.service.GetForm('Products/GetForm').subscribe(resp => {
      this.Product = resp.data;
    })
  }

  imageLoading: boolean = false;
  ImageUploadSuccess: boolean = false
  chooseFile(event: any) {
    this.imageLoading = true;
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const fd = new FormData();
      fd.append('file', files[i]);
      this.fileService.UploadFile(fd).subscribe((resp: any) => {
        this.imageLoading = false;
        this.ImageUploadSuccess = true;
        setInterval(() => {
          this.ImageUploadSuccess = false;
        }, 2000);
        this.Product.image = resp.data;
      });
    }
  }
  getModelsByType(typeId: string, modelId?: any) {
    this.modelsService.GetModelsInType(typeId).subscribe((resp: any) => {
      this.Models = resp.data;
      if (this.ProductId !== 'create') {
        this.selectedModel = this.Models.find((x: any) => x.id === modelId);
      }
    })
  }
  Create() {
    this.Product.years = []
    this.SelectedDates.forEach(date => {
      this.Product.years.push(date.getFullYear())
    })
    this.Product.carTypeId = this.selectedType.id;
    this.Product.applicationCarManufacturerId = this.selectedCarManufacturer.id;
    this.Product.partManufacturerId = this.selectedPartManufacturer.id;
    this.Product.modelId = this.selectedModel.id;
    if(this.isValid()){
      this.service.Create('Products/CreateProduct', this.Product).subscribe(resp => {
        if (resp.succeeded) {
          this.router.navigate(['admin/products']);
        }
      })
    }
    else{
      this.showError();
    }
  }

  getProduct(id: string) {
    this.service.GetById('Products/GetProduct/', id).subscribe(resp => {
      this.Product = resp.data;
      this.selectedCarManufacturer = this.CarManufacturers.find((x: any) => x.id === resp.data.applicationCarManufacturerId);
      this.selectedType = this.selectedCarManufacturer?.types.find((x: any) => x.id === resp.data.carTypeId);
      this.selectedPartManufacturer = this.PartManufacturers.find((x: any) => x.id === resp.data.partManufacturerId);
      if(this.selectedType) this.getModelsByType(this.selectedType.id, resp.data.modelId);
      resp.data.years.forEach((x: any) => {
        this.SelectedDates.push(new Date(x.toString()));
      })
      this.showDatePicker = true;
    })
  }


  Update() {
    this.Product.years = []
    this.SelectedDates.forEach(date => {
      this.Product.years.push(date.getFullYear())
    })
    this.Product.carTypeId = this.selectedType.id;
    this.Product.applicationCarManufacturerId = this.selectedCarManufacturer.id;
    this.Product.partManufacturerId = this.selectedPartManufacturer.id;
    this.Product.modelId = this.selectedModel.id;
    if (this.isValid()) {
      this.service.Update('Products/UpdateProduct', this.Product).subscribe(resp => {
        if (resp.succeeded) {
          this.router.navigate(['admin/products']);
        }
      })
    }
    else{
      this.showError();
    }
  }

  isValid() {
    var valid: boolean = true;
    if (!this.Product.code || !this.Product.engine || !this.Product.image) valid = false;
    if (this.Product.price < 1 || this.Product.qty < 1) valid = false;
    if (this.Product.years.length === 0) valid = false;
    this.Product.name.items.forEach(item => {
      if (!item.value) valid = false;
    })
    return valid;
  }
  showError(){
    this.messageService.add({
      severity: 'error',
      summary:  LanguagedErrorHandler.LanguagedErrorHandler().summary[this.translate.currentLang as keyof LangType],
      detail: LanguagedErrorHandler.LanguagedErrorHandler().detail[this.translate.currentLang as keyof LangType],
    });
  }
}
