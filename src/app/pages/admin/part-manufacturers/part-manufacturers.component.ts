import { Component, OnInit } from '@angular/core';
import { PartManufacturerService } from '../../../services/part-manufacturer.service';
import { PartManufacturersRequest } from '../../../models/PartManufacturersRequest.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-part-manufacturers',
  templateUrl: './part-manufacturers.component.html',
  styleUrls: ['./part-manufacturers.component.scss']
})
export class PartManufacturersComponent implements OnInit {
  cols: any[] = []
  PartManufacturers: any[] = []
  Request: PartManufacturersRequest = new PartManufacturersRequest();

  constructor(private service: PartManufacturerService, private messageService: MessageService) {
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

  GetPartManufacturers() {
    this.service.GetAll('PartManufacturers/GetManufacturers', null).subscribe(resp => {
      this.PartManufacturers = resp.data;
    })
  }

  Create(component: PartManufacturersComponent) {
    component.service.Create('PartManufacturers/CreateManufacturer', component.Request).subscribe((resp) => {
      component.Request.name = '';
      component.GetPartManufacturers();
    })
  }

  Update(component: PartManufacturersComponent) {
    component.service.Update('PartManufacturers/UpdateManufacturer', component.Request).subscribe((resp) => {
      component.GetPartManufacturers();
      component.Request.name = '';
    })
  }

  GetById(id: string) {
    this.service.GetById('PartManufacturers/GetManufacturer/', id).subscribe(resp => {
      this.Request = resp.data;
    })
  }

  Delete(id: string) {
    this.service.Delete('PartManufacturers/DeleteManufactuer/', id).subscribe(resp => {
      this.GetPartManufacturers();
    })
  }

  Action(e: any) {
    if (e.type === 'remove') this.Delete(e.data.id);
    else this.GetById(e.data.id);
  }

  isValid(callBack: Function, component: PartManufacturersComponent) {
    if (!this.Request.name) this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Fill in all required fields' });
    else callBack(component);
  }
}
