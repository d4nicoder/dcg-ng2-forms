import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DatepickerComponent } from './datepicker/datepicker.component';
import { InputQueryComponent } from './inputquery/inputquery.component';
import { HttpModule } from '@angular/http';

@NgModule({
    imports: [ CommonModule, HttpModule ],
    exports: [ DatepickerComponent, InputQueryComponent ],
    declarations: [ DatepickerComponent, InputQueryComponent ]
})
export class DCGForms { }
