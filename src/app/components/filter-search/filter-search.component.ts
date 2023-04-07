import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BaseCrudService } from '../../services/base-crud.service';
import { PartManufacturerService } from '../../services/part-manufacturer.service';
import { TranslateService } from '@ngx-translate/core';
import { ModelsService } from 'src/app/services/models.service';
import { FilterRequest } from '../../models/FilterRequest.model';
import { LocalStorage } from '@ngx-pwa/local-storage';

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
  Models: any[] = [];
  selectedModels: any[] = [];
  @Output() Filter: any = new EventEmitter();
  constructor(
    private baseCrudService: BaseCrudService,
    private partManufacturerService: PartManufacturerService,
    private translate: TranslateService,
    private modelsService: ModelsService,
    private storage: LocalStorage
  ) {
    // Clear all filter data from storage
    this.subscription = this.translate.onLangChange.subscribe((lang) => {
      this.clearSearch()
    });
  };

  ngOnInit(): void {
    const jsonString = localStorage.getItem('myObject') as string;
    const obj = JSON.parse(jsonString);
    console.log(obj);

    if (!obj && obj !== 'null') {
      this.getPartManufacturers()
      this.getCarManufacturers(this.translate.currentLang);
    }
    else {
      this.getFilterFieldsFromStorage(obj);
      this.getSelectedFieldsFromStorage();
    }
  }
  getFilterFieldsFromStorage(obj: any) {
    this.CarManufacturers = obj.CarManufacturers;
    this.Models = obj.Models;
    this.PartManufacturers = obj.PartManufacturers;
    this.Types = obj.Types;
  }
  getSelectedFieldsFromStorage() {
    const jsonString = localStorage.getItem('selectedFields') as string;
    const obj = JSON.parse(jsonString);
    console.log(obj, 'selectedFields');

    this.selectedCarManufacturers = obj.selectedCarManufacturers;
    this.selectedTypes = obj.selectedTypes;
    this.selectedModels = obj.selectedModels;
    this.selectedPartManufacturers = obj.selectedPartManufacturers;
    this.FilterText = obj.FilterText;
    this.FromDate = obj.FromDate ? new Date(obj.FromDate) : null;
    this.ToDate = obj.ToDate ? new Date(obj.ToDate) : null;
    this.filter();
  }

  getPartManufacturers() {
    this.partManufacturerService.GetAll('PartManufacturers/GetManufacturers', null).subscribe(resp => {
      this.PartManufacturers = resp.data;
    })
  }

  getCarManufacturers(lang: any) {
    this.baseCrudService.GetAll(`Manufacturers/GetManufacturers/${lang}`).subscribe(resp => {
      this.CarManufacturers = resp.data;
    })
  }

  getTypes() {
    this.Types = [];
    if (this.selectedCarManufacturers.length > 0) {
      this.selectedCarManufacturers.forEach(manufacturer => {
        this.Types.push(...manufacturer.types);
      })
    }
    else {
      this.selectedTypes = [];
      this.selectedModels = [];
      this.Types = [];
      this.Models = []
    }
  }

  getModelsByType() {
    this.Models = [];
    if (this.selectedTypes.length > 0) {
      this.selectedTypes.forEach(type => {
        this.modelsService.GetModelsInType(type.id).subscribe(resp => {
          this.Models.push(...resp.data);
        })
      })
    }
    else {
      this.selectedModels = []
      this.Models = []
    }
  }


  filterRequest: FilterRequest = new FilterRequest();
  filter() {
    if (this.selectedCarManufacturers.length !== 0) this.filterRequest.ApplicationCarManufacturerIds = this.selectedCarManufacturers.map(a => a.id);
    if (this.selectedTypes.length !== 0) this.filterRequest.CarTypeIds = this.selectedTypes.map(a => a.id);
    if (this.selectedPartManufacturers.length !== 0) this.filterRequest.PartManufacturerIds = this.selectedPartManufacturers.map(a => a.id);
    if (this.selectedModels.length !== 0) this.filterRequest.ModelIds = this.selectedModels.map(a => a.id);
    if (this.FilterText) this.filterRequest.SearchText = this.FilterText;
    if (this.FromDate) this.filterRequest.From = this.FromDate.getFullYear();
    if (this.ToDate) this.filterRequest.To = this.ToDate.getFullYear();
    this.filterRequest.Lang = this.translate.currentLang;
    console.log(this.filterRequest);
    this.Filter.emit(this.filterRequest);
    this.setFilterFields()
    this.setSelectedFields();
  }

  clearSearch() {
    this.selectedCarManufacturers = []
    this.selectedTypes = []
    this.selectedPartManufacturers = []
    this.selectedModels = []
    this.FilterText = null;
    this.FromDate = null;
    this.ToDate = null;
    this.filterRequest = new FilterRequest();
    this.resetAllFilterFields();
    this.filter()
  }
  resetAllFilterFields() {
    localStorage.setItem('myObject', 'null');
    localStorage.setItem('selectedFields', 'null');
    this.getPartManufacturers()
    this.getCarManufacturers(this.translate.currentLang);
  }
  setFilterFields() {
    var obj = {
      CarManufacturers: this.CarManufacturers,
      Types: this.Types,
      Models: this.Models,
      PartManufacturers: this.PartManufacturers
    };
    const jsonString = JSON.stringify(obj);
    localStorage.setItem('myObject', jsonString);
  }
  setSelectedFields() {
    var obj = {
      selectedCarManufacturers: this.selectedCarManufacturers,
      selectedTypes: this.selectedTypes,
      selectedModels: this.selectedModels,
      selectedPartManufacturers: this.selectedPartManufacturers,
      FilterText: this.FilterText,
      FromDate: this.FromDate,
      ToDate: this.ToDate,
    };
    const jsonString = JSON.stringify(obj);
    localStorage.setItem('selectedFields', jsonString);
  }
}
