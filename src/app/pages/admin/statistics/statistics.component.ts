import { Component, OnInit } from '@angular/core';
import { StatisticcsFilterRequest } from 'src/app/models/StatisticsFilterRequest.model';
import { ProductsService } from 'src/app/services/products.service';
import { StatisticsService } from '../../../services/statistics.service';
import { StatisticsResponse } from 'src/app/models/StatisticsResponse.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  private subscription:any;
  FilterRequest: StatisticcsFilterRequest = new StatisticcsFilterRequest();
  From: Date;
  To: Date;
  Products: any[] = [];
  Response: StatisticsResponse = new StatisticsResponse();
  selectedProduct: any;
  isRevenueTab: boolean = false;
  FilteredProducts: any[] = [];
  FilteredRevenue: any[] = [];
  RevenueResponse: StatisticsResponse = new StatisticsResponse()
  constructor(
    private productsService: ProductsService,
     private stService: StatisticsService,
     private translate: TranslateService
     ) { };
  ngOnInit(): void {
    this.GetAllProducts();
    const date = new Date();
    this.From = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    this.To = new Date();

    this.FilterRequest.PageIndex = 1;
    this.FilterRequest.PageSize = 5;
    this.FilterRequest.SortType = 1;
    this.FilterStatistics();
    this.subscription = this.translate.onLangChange.subscribe((lang) => {
      this.GetAllProducts();
      this.FilterStatistics();
    });
  }
  GetAllProducts() {
    this.productsService.GetAll(`Products/GetAll/${this.translate.currentLang}`).subscribe(resp => {
      this.Products = resp.data;
    })
  }

  sortFields: any[] = [
    { key: 'productCode', value: null, displayName: 'ProductID' },
    { key: 'productName', value: null, displayName: 'Name' },
    { key: 'incoming', value: null, displayName: 'Incoming' },
    { key: 'outgoing', value: null, displayName: 'Outgoing' },
    { key: 'rest', value: null, displayName: 'Rest' },
  ]

  FilterStatistics() {
    this.FilterRequest.Lang = this.translate.currentLang;
    if (this.selectedProduct) this.FilterRequest.ProductId = this.selectedProduct.id;
    if (this.From && this.To) {
      this.FilterRequest.From = new Date(this.From).toISOString();
      var date = new Date(this.To)
      this.FilterRequest.To = new Date(new Date(date.getFullYear(), date.getMonth()+1, 0)).toISOString();
      this.stService.FilterProducts(this.FilterRequest).subscribe(resp => {
        this.Response = resp.data;
        this.FilteredProducts = resp.data.items;
      })
      this.stService.FilterRevenue(this.FilterRequest).subscribe(resp => {
        this.FilteredRevenue = resp.data.items;
        this.RevenueResponse = resp.data;
      })
    }
    else {
      alert('select Dates');
    }
  }
  getFilterField(e: any) {
    if (e.value === null) {
      this.sortFields.find(x => x.key === e.key).value = true;
    }
    else {
      this.sortFields.find(x => x.key === e.key).value = !this.sortFields.find(x => x.key === e.key).value;
    }
    this.sortFields.filter(x => x.key !== e.key).forEach(i => i.value = null);
    this.FilterRequest.SortField = e.key;
    this.FilterRequest.SortType = e.value ? 1 : 0;
    this.FilterStatistics();
  }
  GetAllWithPaging(e: any) {
    this.FilterRequest.PageIndex = e;
    this.FilterStatistics();
  }
}
