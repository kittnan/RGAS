import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {

  filteredOptions!: Observable<string[]>;
  myControlChange: EventEmitter<FormControl> = new EventEmitter()
  @Input() myControl: FormControl = new FormControl('');
  @Input() value: any
  @Input() title: string = 'title'
  @Input() options: string[] = ['One', 'Two', 'Three'];
  @Output() valueChange: EventEmitter<any> = new EventEmitter()
  ngOnInit() {
    this.myControl.patchValue(this.value)
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value?.toString() || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option?.toString().toLowerCase());
  }
  onChange() {
    // this.myControlChange.emit(this.myControl.value)
    this.valueChange.emit(this.myControl.value)
  }

}
