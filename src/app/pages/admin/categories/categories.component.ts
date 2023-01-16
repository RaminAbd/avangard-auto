import { Component } from '@angular/core';
import { BaseCrudService } from '../../../services/base-crud.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
    Manufacturers:any[]=[]
    constructor(private serice:BaseCrudService){
      this.serice.GetAll('Manufacturers/GetManufacturers/ka-Geo',).subscribe(resp=>{
        this.Manufacturers = resp.data;
      })
    };

}
