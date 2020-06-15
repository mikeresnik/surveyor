import {
  Component, ViewChild, ViewChildren, ElementRef, QueryList, OnInit,
  AfterViewInit, ViewContainerRef
} from '@angular/core';
import {SurveyorFormInputComponent} from '../../../form-input-component';

@Component({
  selector: 'surveyor-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss']
})
export class MobileSelectInputComponent extends SurveyorFormInputComponent implements AfterViewInit {

  @ViewChild('inputBox', {static: true}) inputBox: ElementRef;
  @ViewChild('myPopover', {static: true}) popover: ElementRef;

  items: any[] = [];
  selectedIndex: number;

  ngAfterViewInit() {
    this.initialize();
  }

  setOptions(opts: any) {
    this.controlDefinition.options = opts;
    this.initialize();
  }

  initialize() {
    this.items = JSON.parse(JSON.stringify(this.controlDefinition.options.selections || []));

    const index = this.items.map(item => {
      if (item === undefined) { return item; }
      else { return item.value; }
    }).indexOf(this.controlDefinition.value);

    if (index > -1) {
      this.selectedIndex = index;
      this.setValue(this.controlDefinition.value);
    } else {
      if (this.items.length > 0){
        this.selectedIndex = 0;
        const value = this.items[0].value || this.items[0];
        this.setValue(value);
      } else {
        this.setValue(null);
      }
    }
  }

  itemSelect(item) {
    if (item) {
      const value = (item.value === undefined) ? item : item.value;
      this.formControl.setValue(value, {
        emitEvent: false,
        emitModelToViewChange: false
      });
    }
  }

  setValue(val: any) {
    if (this.items) {
      const item = this.items.find(i => {
        if (i.value === undefined) { return i === val; }
        else { return i.value === val; }
      });
      if (item) {
        this.itemSelect(item.value || item);
      } else {
        this.formControl.setValue(null);
      }
    }
  }
}
