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
  subscription: any;
  constructor(
    private service: ProductsService,
    private route: ActivatedRoute,
    private baseCrudService: BaseCrudService,
    private modelsService: ModelsService,
    private partManufacturerService: PartManufacturerService,
    private fileService: FileService,
    private router: Router,
    private messageService: MessageService,
    private translate: TranslateService
  ) {
    this.ProductId = this.route.snapshot.paramMap.get('type') as string;
    this.getCarManufacturers();
    this.getPartManufacturers()
    this.subscription = this.translate.onLangChange.subscribe((lang) => {
      this.getCarManufacturers()
    });
  }

  ngOnInit(): void {
    if (this.ProductId === 'create') this.showDatePicker = true;
  }

  getPartManufacturers() {
    this.partManufacturerService.GetAll('PartManufacturers/GetManufacturers', null).subscribe(resp => {
      this.PartManufacturers = resp.data;
    })
  }

  getCarManufacturers() {
    this.baseCrudService.GetAll(`Manufacturers/GetManufacturers/${this.translate.currentLang}`).subscribe(resp => {
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
    this.DatesForService.forEach(date => {
      this.Product.years.push(date.getFullYear())
    })
    this.Product.carTypeId = this.selectedType.id;
    this.Product.applicationCarManufacturerId = this.selectedCarManufacturer.id;
    this.Product.partManufacturerId = this.selectedPartManufacturer.id;
    this.Product.modelId = this.selectedModel.id;
    if (this.isValid()) {
      this.service.Create('Products/CreateProduct', this.Product).subscribe(resp => {
        if (resp.succeeded) {
          this.router.navigate(['admin/products']);
        }
      })
    }
    else {
      this.showError();
    }
  }

  getProduct(id: string) {
    this.DatesForService = []
    this.service.GetById('Products/GetProduct/', id).subscribe(resp => {
      this.Product = resp.data;
      this.selectedCarManufacturer = this.CarManufacturers.find((x: any) => x.id === resp.data.applicationCarManufacturerId);
      this.selectedType = this.selectedCarManufacturer?.types.find((x: any) => x.id === resp.data.carTypeId);
      this.selectedPartManufacturer = this.PartManufacturers.find((x: any) => x.id === resp.data.partManufacturerId);
      if (this.selectedType) this.getModelsByType(this.selectedType.id, resp.data.modelId);
      this.SelectedDates = resp.data.years;
      this.FakeSelectedDates = resp.data.years[0] + ' - ' + resp.data.years[resp.data.years.length - 1];
      this.showDatePicker = true;
      // this.getYears();
      resp.data.years.forEach((year:any)=>{
        this.DatesForService.push(new Date(year.toString()));
      })
    })
  }


  Update() {
    this.Product.years = []
    this.DatesForService.forEach(date => {
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
    else {
      this.showError();
    }
  }

  isValid() {
    var valid: boolean = true;
    if (!this.Product.code || !this.Product.engine || !this.Product.image) valid = false;
    // if (this.Product.price <= 0 || this.Product.qty < 1) valid = false;
    if (this.Product.years.length === 0) valid = false;
    this.Product.name.items.forEach(item => {
      if (!item.value) valid = false;
    })
    return valid;
  }
  showError() {
    this.messageService.add({
      severity: 'error',
      summary: LanguagedErrorHandler.LanguagedErrorHandler().summary[this.translate.currentLang as keyof LangType],
      detail: LanguagedErrorHandler.LanguagedErrorHandler().detail[this.translate.currentLang as keyof LangType],
    });
  }
  FakeSelectedDates: any;
  DatesForService: any[] = [];
  getYears(e: any) {
    if (this.SelectedDates.length > 2) {
      var date1 = e[e.length - 1];
      this.SelectedDates = [date1];
    }
    if (this.SelectedDates.length === 2) {
      if (this.SelectedDates[0].getFullYear() > this.SelectedDates[1].getFullYear()) {
        var d = this.SelectedDates[0];
        this.SelectedDates[0] = this.SelectedDates[1];
        this.SelectedDates[1] = d;
      }
      this.FakeSelectedDates = this.SelectedDates[0].getFullYear() + ' - ' + this.SelectedDates[1].getFullYear();
      var d1 = this.SelectedDates[0].getFullYear();
      var d2 = this.SelectedDates[1].getFullYear();
      var dates: any[] = [];
      dates.push(this.SelectedDates[0])
      for (let i = d1 + 1; i < d2; i++) {
        dates.push(new Date(`01-01-${i.toString()}`));
      }
      dates.push(this.SelectedDates[1])
      this.DatesForService = dates;
    }

  }
  findMode(numbers: number[]): number | undefined {
    if (numbers.length === 0) {
      return undefined;
    }

    const frequency = new Map<number, number>();
    let maxFrequency = 0;
    let mode: number | undefined = undefined;

    for (const num of numbers) {
      const count = (frequency.get(num) ?? 0) + 1;
      frequency.set(num, count);

      if (count > maxFrequency) {
        maxFrequency = count;
        mode = num;
      }
    }

    return mode;
  }


}
