import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TypesService } from '../../../../services/types.service';
import { BaseCrudService } from '../../../../services/base-crud.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-manufacturer-ford',
  templateUrl: './manufacturer-ford.component.html',
  styleUrls: ['./manufacturer-ford.component.scss']
})
export class ManufacturerFordComponent implements OnInit {
  Type: string;
  TypeForm: any;
  Types: any[] = []
  cols: any[] = [];
  ManufacturerId: string;

  constructor(
    private typesService: TypesService,
    private baseCrudService: BaseCrudService,
    private router: Router,
    private messageService: MessageService
  ) { };

  ngOnInit(): void {
    this.GetForm();
    this.setCols()
    this.GetManufacturers('Ford')
  }

  GetManufacturers(type: string) {
    this.baseCrudService.GetAll('Manufacturers/GetManufacturers/ka-Geo').subscribe(resp => {
      this.ManufacturerId = resp.data.find((x: any) => x.name === type).id;
      this.GetAll();
    })
  }
  GetForm() {
    this.typesService.GetForm().subscribe(resp => {
      this.TypeForm = resp.data;
    })
  }
  GetAll() {
    var obj = {
      ManufacturerId: this.ManufacturerId,
      Lang: 'ka-Geo'
    };
    this.typesService.GetAllTypesInManufacturer(obj).subscribe(resp => {
      this.Types = resp.data;
    })
  }
  setCols() {
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'detCrudActions', header: 'Action', width: '150px' },
    ];
  }
  CreateType() {
    if (this.isValid()) {
      // this.typesService.CreateType(this.TypeForm).subscribe(resp => {
      //   var obj = {
      //     "typeId": resp.data.id,
      //     "manufacturerId": this.ManufacturerId
      //   }
      //   this.typesService.AddTypeToManufacturer(obj).subscribe(resp => {
      //     if (resp.succeeded) {
      //       this.GetAll()
      //       this.GetForm();
      //     }
      //   })
      // })
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Fill in all required fields' });
    }
  }
  UpdateType() {
    if (this.isValid()) {
      this.typesService.UpdateType(this.TypeForm).subscribe(resp => {
        this.GetAll()
        this.GetForm();
      })
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Fill in all required fields' });
    }
  }
  isValid() {
    var isValid: boolean = true;
    this.TypeForm.name.items.forEach((item: any) => {
      if (!item.value) isValid = false;
    })
    return isValid;
  }
  Action(e: any, type: string) {
    if (e.type === 'remove') {
      this.typesService.DeleteType(e.data.id).subscribe(resp => {
        this.GetAll();
      })
    }
    else if (e.type === 'detail') {
      this.router.navigate(['admin/categories', type, e.data.id, this.ManufacturerId])
    }
    else {
      this.typesService.GetType(e.data.id).subscribe(resp => {
        this.TypeForm = resp.data;
      })
    }
  }
}
