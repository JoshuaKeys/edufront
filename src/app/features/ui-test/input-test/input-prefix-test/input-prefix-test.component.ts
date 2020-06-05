import { Component, OnInit, ChangeDetectionStrategy, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'edu-input-prefix-test',
  templateUrl: './input-prefix-test.component.html',
  styleUrls: ['./input-prefix-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputPrefixTestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  value = "";
  //oninit also must initvalue

  @Output("setConfig") setConfig = new EventEmitter(); 
  onInput($event){
    this.setConfig.emit({key:"prefixValue", value : this.value})

  }

}

