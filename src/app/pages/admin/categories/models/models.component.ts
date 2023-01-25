import { Component, OnInit } from '@angular/core';
import { ModelRequest } from '../../../../models/ModelRequest.model';
import { ModelsService } from 'src/app/services/models.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss']
})
export class ModelsComponent implements OnInit {
  ModelForm: ModelRequest = new ModelRequest();
  ModelsInType: ModelRequest[] = []
  cols: any[] = []
  constructor(private service: ModelsService, private route: ActivatedRoute, private messageService: MessageService) {
    this.ModelForm.typeId = this.route.snapshot.paramMap.get('typeId') as string;
    this.ModelForm.manufacturerId = this.route.snapshot.paramMap.get('manufacturerId') as string;
  };

  ngOnInit(): void {
    this.GetModelsInType();
    this.setCols()
  }
  setCols() {
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'crudActions', header: 'Action', width: '150px' },
    ];
  }
  GetModelsInType() {
    this.service.GetModelsInType(this.ModelForm.typeId).subscribe(resp => {
      this.ModelsInType = resp.data;
    })
  }
  CreateModel() {
    if (this.isValid()) {
      this.service.Create('Models/CreateModel', this.ModelForm).subscribe(resp => {
        this.ModelForm.name = '';
        this.GetModelsInType();
      })
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Fill in all required fields' });
    }
  }
  Action(e: any) {
    if (e.type === 'remove') {
      this.service.Delete('Models/DeleteModel/', e.data.id).subscribe(resp => {
        this.GetModelsInType();
      })
    }
    else {
      this.service.GetById('Models/GetModel/', e.data.id).subscribe(resp => {
        this.ModelForm = resp.data;
      })
    }
  }
  UpdateModel() {
    if (this.isValid()) {
      this.service.Update('Models/UpdateModel', this.ModelForm).subscribe(resp => {
        this.GetModelsInType();
        this.ModelForm.name = '';
      })
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Fill in all required fields' });
    }
  }
  isValid() {
    if (!this.ModelForm.name) return false;
    else return true;
  }
}
