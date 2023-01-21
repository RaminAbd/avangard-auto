import { Injectable, EventEmitter } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { StatisticcsFilterRequest } from '../models/StatisticsFilterRequest.model';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService extends BaseService{
  StatisticsFilter:any = new EventEmitter();
  constructor(http:HttpClient) { super(http); }
  FilterProducts(filterObj:StatisticcsFilterRequest){
    return this.get('Statistics/FilterProducts', null, filterObj);
  }
  FilterRevenue(revenueObj:StatisticcsFilterRequest){
    return this.get('Statistics/FilterRevenue', null, revenueObj);
  }
}
