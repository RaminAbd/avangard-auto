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
  AllTypes:any[]=[]
  Types: any[] = [];
  selectedType: any;
  PartManufacturers: any[] = [];
  selectedPartManufacturer: any;
  SelectedDates: any[] = [];
  Image: any;
  Models:any[]=[];
  selectedModel:any;
  constructor(
    private service: ProductsService,
    private route: ActivatedRoute,
    private baseCrudService: BaseCrudService,
    private modelsService: ModelsService,
    private partManufacturerService: PartManufacturerService,
    private fileService: FileService,
    private router: Router
  ) {
    this.ProductId = this.route.snapshot.paramMap.get('type') as string;

    this.getCarManufacturers();
    this.getPartManufacturers()

  }

  ngOnInit(): void {

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
        this.Image = resp.data;
      });
    }
  }
  getModelsByType(typeId:string, modelId?:any) {
    this.modelsService.GetModelsInType(typeId).subscribe((resp: any) => {
      this.Models = resp.data;
      if(this.ProductId !== 'create'){
        this.selectedModel = this.Models.find((x: any) => x.id === modelId);
      }
    })
  }
  Create() {
    var dates: number[] = []
    this.SelectedDates.forEach(date => {
      dates.push(date.getFullYear())
    })
    this.Product.carTypeId = this.selectedType.id;
    this.Product.applicationCarManufacturerId = this.selectedCarManufacturer.id;
    this.Product.partManufacturerId = this.selectedPartManufacturer.id;
    this.Product.image = this.Image;
    this.Product.years = dates;
    this.Product.modelId = this.selectedModel.id
    console.log(this.Product);
    this.service.Create('Products/CreateProduct', this.Product).subscribe(resp => {
      if (resp.succeeded) {
        this.router.navigate(['admin/products']);
      }
    })
  }
  @ViewChild('myCalendar') datePicker:Calendar;
  getProduct(id: string) {
    this.datePicker.showOverlay();
    this.service.GetById('Products/GetProduct/', id).subscribe(resp => {
      this.Product = resp.data;
      this.selectedCarManufacturer = this.CarManufacturers.find((x: any) => x.id === resp.data.applicationCarManufacturerId);
      this.selectedType = this.selectedCarManufacturer?.types.find((x: any) => x.id === resp.data.carTypeId);
      this.selectedPartManufacturer = this.PartManufacturers.find((x: any) => x.id === resp.data.partManufacturerId);
      this.getModelsByType(this.selectedType.id, resp.data.modelId);
      this.Image = resp.data.image;

      resp.data.years.forEach((x: any) => {
        this.SelectedDates.push(new Date(x.toString()));
      })
      // this.datePicker.overlayVisible = true;
    })
  }


  Update(){
    var dates: number[] = []
    this.SelectedDates.forEach(date => {
      dates.push(date.getFullYear())
    })
    this.Product.carTypeId = this.selectedType.id;
    this.Product.applicationCarManufacturerId = this.selectedCarManufacturer.id;
    this.Product.partManufacturerId = this.selectedPartManufacturer.id;
    this.Product.modelId = this.selectedModel.id;
    this.Product.image = this.Image;
    this.Product.years = dates;

    console.log(this.Product);
    this.service.Update('Products/UpdateProduct', this.Product).subscribe(resp => {
      if (resp.succeeded) {
        this.router.navigate(['admin/products']);
      }
    })
  }
}
