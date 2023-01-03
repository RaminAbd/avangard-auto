import { Component } from '@angular/core';

@Component({
  selector: 'app-manufacturer-ford',
  templateUrl: './manufacturer-ford.component.html',
  styleUrls: ['./manufacturer-ford.component.scss']
})
export class ManufacturerFordComponent {
  Type: string;
  CreateType(){
    console.log(this.Type);

  }
}
