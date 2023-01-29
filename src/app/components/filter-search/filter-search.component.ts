import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BaseCrudService } from '../../services/base-crud.service';
import { PartManufacturerService } from '../../services/part-manufacturer.service';
import { TranslateService } from '@ngx-translate/core';
import { ModelsService } from 'src/app/services/models.service';
import { FilterRequest } from '../../models/FilterRequest.model';

@Component({
  selector: 'app-filter-search',
  templateUrl: './filter-search.component.html',
  styleUrls: ['./filter-search.component.scss']
})
export class FilterSearchComponent implements OnInit {
  private subscription: any;
  CarManufacturers: any[] = []
  selectedCarManufacturers: any[] = [];
  selectedTypes: any[] = [];
  PartManufacturers: any[] = [];
  selectedPartManufacturers: any[] = [];
  FromDate: Date | null;
  ToDate: Date | null;
  FilterText: string | null;
  Types: any[] = [];
  Models:any[]=[];
  selectedModels: any[] = [];
  @Output() Filter:any = new EventEmitter();
  constructor(
    private baseCrudService: BaseCrudService,
    private partManufacturerService: PartManufacturerService,
    private translate: TranslateService,
    private modelsService: ModelsService
  ) {
    this.subscription = this.translate.onLangChange.subscribe((lang) => {
      this.getCarManufacturers(lang.lang);
    });
  };
  ngOnInit(): void {
    this.getPartManufacturers()
    this.getCarManufacturers(this.translate.currentLang);
  }
  getPartManufacturers() {
    this.partManufacturerService.GetAll('PartManufacturers/GetManufacturers', null).subscribe(resp => {
      this.PartManufacturers = resp.data;
    })
  }
  getCarManufacturers(lang:any) {
    this.baseCrudService.GetAll(`Manufacturers/GetManufacturers/${lang}`).subscribe(resp => {
      this.CarManufacturers = resp.data;
    })
  }
  getTypes(){
    this.Types = [];
    this.selectedCarManufacturers.forEach(manufacturer =>{
      this.Types.push(...manufacturer.types);
    })
  }
  getModelsByType(){
    this.Models = [];
    this.selectedTypes.forEach(type =>{
      this.modelsService.GetModelsInType(type.id).subscribe(resp=>{
        this.Models.push(...resp.data);
      })
    })
  }
  filterRequest:FilterRequest = new FilterRequest();
  filter() {
    console.log(this.selectedCarManufacturers);
    if(this.selectedCarManufacturers.length!==0) this.filterRequest.ApplicationCarManufacturerIds = this.selectedCarManufacturers.map(a => a.id);
    if(this.selectedTypes.length!==0) this.filterRequest.CarTypeIds = this.selectedTypes.map(a => a.id);
    if(this.selectedPartManufacturers.length!==0) this.filterRequest.PartManufacturerIds = this.selectedPartManufacturers.map(a => a.id);
    if(this.selectedModels.length!==0) this.filterRequest.ModelIds = this.selectedModels.map(a => a.id);
    if(this.FilterText) this.filterRequest.SearchText = this.FilterText;
    if(this.FromDate) this.filterRequest.From = this.FromDate.getFullYear();
    if(this.ToDate) this.filterRequest.To = this.ToDate.getFullYear();
    this.filterRequest.Lang = this.translate.currentLang;
    console.log(this.filterRequest);
    this.Filter.emit(this.filterRequest);
  }
  clearSearch(){
    this.selectedCarManufacturers = []
    this.selectedTypes = []
    this.selectedPartManufacturers = []
    this.selectedModels = []
    this.FilterText = null;
    this.FromDate = null;
    this.ToDate = null;
    this.filterRequest = new FilterRequest();
    this.filter()
  }
}
