import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BaseCrudService } from '../../services/base-crud.service';
import { PartManufacturerService } from '../../services/part-manufacturer.service';
import { TranslateService } from '@ngx-translate/core';
import { ModelsService } from 'src/app/services/models.service';

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
  FromDate: Date;
  ToDate: Date;
  FilterText: string;
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
  filter() {
    var obj = {
      ApplicationCarManufacturerIds: this.selectedCarManufacturers.map(a => a.id),
      CarTypeIds: this.selectedTypes.map(a => a.id),
      PartManufacturerIds: this.selectedPartManufacturers.map(a => a.id),
      ModelIds: this.selectedModels.map(a => a.id),
      From: this.FromDate?.getFullYear(),
      To: this.ToDate?.getFullYear(),
      SearchText: this.FilterText,
      Lang: this.translate.currentLang
    }
    console.log(obj);
    this.Filter.emit(obj);
  }
}
