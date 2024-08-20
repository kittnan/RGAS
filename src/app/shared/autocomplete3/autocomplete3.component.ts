import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map, debounceTime } from 'rxjs';

@Component({
  selector: 'app-autocomplete3',
  templateUrl: './autocomplete3.component.html',
  styleUrls: ['./autocomplete3.component.scss']
})
export class Autocomplete3Component implements OnInit {

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
    this.myControl.valueChanges.pipe(
      debounceTime(500)  // wait for 2 seconds after the last keydown event
    ).subscribe(() => {
      this.onChange()
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option?.toLowerCase().includes(filterValue));
  }
  onChange() {
    this.myControlChange.emit(this.myControl)
  }

}
