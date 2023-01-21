import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StatisticsResponse } from '../../models/StatisticsResponse.model';

@Component({
  selector: 'app-statistics-table',
  templateUrl: './statistics-table.component.html',
  styleUrls: ['./statistics-table.component.scss']
})
export class StatisticsTableComponent {
  @Input() FilteredItems:any[]=[];
  @Input() sortFields:any[]=[];
  @Output() getFilterField:any = new EventEmitter();
  @Input() Response:StatisticsResponse = new StatisticsResponse();
  @Output() GetAllWithPaging:any = new EventEmitter();
  @Input() Type:any;
}
