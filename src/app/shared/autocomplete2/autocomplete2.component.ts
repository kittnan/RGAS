import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';

@Component({
  selector: 'app-autocomplete2',
  templateUrl: './autocomplete2.component.html',
  styleUrls: ['./autocomplete2.component.scss']
})
export class Autocomplete2Component implements OnInit {

  filteredOptions!: Observable<string[]>;
  @Input() myControl: FormControl = new FormControl('');
  @Output() myControlChange: EventEmitter<FormControl> = new EventEmitter()
  @Input() title: string = 'title'
  @Input() options: string[] = ['One', 'Two', 'Three'];
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value?.toString() || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option?.toLowerCase().includes(filterValue));
  }
  onChange() {
      this.myControlChange.emit(this.myControl)
  }
}
