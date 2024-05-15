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
import { FileListComponent } from './file-list/file-list.component';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { FilesBottomComponent } from './files-bottom/files-bottom.component';
import { Form1ViewComponent } from './rgas2/form1-view/form1-view.component';
import { ManSectionSelectComponent } from './dialogs/man-section-select/man-section-select.component';
import { HttpClientModule } from '@angular/common/http';
import { Form2ViewComponent } from './rgas2/form2-view/form2-view.component';
import { ReportViewComponent } from './report-view/report-view.component';
import { YearMonthComponent } from './year-month/year-month.component';
import { DialogCommentComponent } from './dialog-comment/dialog-comment.component';
import { Autocomplete2Component } from './autocomplete2/autocomplete2.component';
import { Form4Component } from './rgas2/form4/form4.component';
import { NgxEditorModule } from 'ngx-editor';
import { DialogEmailComponent } from './dialog-email/dialog-email.component';
import { Form1EngineerComponent } from './rgas2/form1-engineer/form1-engineer.component';
import { Form3ViewComponent } from './rgas2/form3-view/form3-view.component';
import { Form4ViewComponent } from './rgas2/form4-view/form4-view.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { DatePickerCustomComponent } from './date-picker-custom/date-picker-custom.component';
import { ReportKcDcComponent } from '../pages/all-member/report-kc-dc/report-kc-dc.component';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MMM-YY',
  },
  display: {
    dateInput: 'DD-MMM-YY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

let items = [
  Form1Component,
  SubTitleComponent,
  YearPickerComponent,
  MonthSelectComponent,
  TitleComponent,
  Rgas1Component,
  Rgas2Component,
  DialogCommentComponent
]

@NgModule({
  declarations: [
    ...items,
    AutocompleteComponent,
    Form1MultipleComponent,
    Form2Component,
    Form3Component,
    FileListComponent,
    FilesBottomComponent,
    Form1ViewComponent,
    ManSectionSelectComponent,
    Form2ViewComponent,
    ReportViewComponent,
    YearMonthComponent,
    Autocomplete2Component,
    Form4Component,
    DialogEmailComponent,
    Form1EngineerComponent,
    Form3ViewComponent,
    Form4ViewComponent,
    DatePickerCustomComponent,
    ReportKcDcComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxEditorModule,
    AngularEditorModule
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
    FilesBottomComponent,
    Form1ViewComponent,
    ManSectionSelectComponent,
    Form2ViewComponent,
    ReportViewComponent,
    YearMonthComponent,
    Autocomplete2Component,
    Form4Component,
    DialogEmailComponent,
    Form1EngineerComponent,
    Form3ViewComponent,
    Form4ViewComponent,
    DatePickerCustomComponent,
    ReportKcDcComponent,
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ],
})
export class SharedModule { }
