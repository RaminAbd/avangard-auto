import { Component, OnInit } from '@angular/core';
import { PartManufacturerService } from '../../../services/part-manufacturer.service';
import { PartManufacturersRequest } from '../../../models/PartManufacturersRequest.model';

@Component({
  selector: 'app-part-manufacturers',
  templateUrl: './part-manufacturers.component.html',
  styleUrls: ['./part-manufacturers.component.scss']
})
export class PartManufacturersComponent implements OnInit{
  cols:any[]=[]
  PartManufacturers:any[]=[]
  Request:PartManufacturersRequest = new PartManufacturersRequest();

  constructor(private service:PartManufacturerService) {
  };
  ngOnInit(): void {
    this.GetPartManufacturers();
    this.setCols()
  }
  setCols() {
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'crudActions', header: 'Action', width: '150px' },
    ];
  }
  GetPartManufacturers(){
    this.service.GetAll('PartManufacturers/GetManufacturers', null).subscribe(resp=>{
      this.PartManufacturers = resp.data;
    })
  }
  Create(){
    console.log(this.Request);
    this.service.Create('PartManufacturers/CreateManufacturer', this.Request).subscribe(resp => {
      this.Request.name = '';
      this.GetPartManufacturers();
    })
  }
  Action(e:any){
    if(e.type==='remove'){
      this.service.Delete('PartManufacturers/DeleteManufactuer/', e.data.id).subscribe(resp=>{
        this.GetPartManufacturers();
      })
    }
    else{
      this.service.GetById('PartManufacturers/GetManufacturer/', e.data.id).subscribe(resp=>{
        this.Request = resp.data;
      })
    }
  }
  Update(){
    this.service.Update('PartManufacturers/UpdateManufacturer', this.Request).subscribe(resp=>{
      this.GetPartManufacturers();
      this.Request.name = '';
    })
  }
}
