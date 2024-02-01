import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../material/material.module';
import { MonthSelectComponent } from './dialogs/month-select/month-select.component';
import { Form1Component } from './rgas2/form1/form1.component';
import { SubTitleComponent } from './sub-title/sub-title.component';
import { TitleComponent } from './title/title.component';
import { YearPickerComponent } from './year-picker/year-picker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Rgas1Component } from '../rgas/rgas1/rgas1.component';
import { Rgas2Component } from '../rgas/rgas2/rgas2.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { Form1MultipleComponent } from './rgas2/form1-multiple/form1-multiple.component';
import { Form2Component } from './rgas2/form2/form2.component';
import { Form3Component } from './rgas2/form3/form3.component';
import { Form3MenuComponent } from './rgas2/form3/form3-menu/form3-menu.component';
import { FileListComponent } from './file-list/file-list.component';


let items = [
  Form1Component,
  SubTitleComponent,
  YearPickerComponent,
  MonthSelectComponent,
  TitleComponent,
  Rgas1Component,
  Rgas2Component,

]

@NgModule({
  declarations: [
    ...items,
    AutocompleteComponent,
    Form1MultipleComponent,
    Form2Component,
    Form3Component,
    Form3MenuComponent,
    FileListComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ...items,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    AutocompleteComponent,
    Form1MultipleComponent,
    Form2Component,
    Form3Component,
    FileListComponent,
  ]
})
export class SharedModule { }
