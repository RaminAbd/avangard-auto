import { Component, OnInit } from '@angular/core';
import { ManufacturerFordComponent } from '../manufacturer-ford/manufacturer-ford.component';

@Component({
  selector: 'app-manufacturer-mercedes',
  templateUrl: './manufacturer-mercedes.component.html',
  styleUrls: ['./manufacturer-mercedes.component.scss']
})
export class ManufacturerMercedesComponent extends ManufacturerFordComponent implements OnInit {

  override ngOnInit(): void {
    this.GetForm();
    this.setCols()
    this.GetManufacturers('Mercedes');
    this.subscription = this.translate.onLangChange.subscribe((lang) => {
      this.GetManufacturers('Mercedes');
    });
  }
}
