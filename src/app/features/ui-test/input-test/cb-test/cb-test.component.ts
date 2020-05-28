import { Component, OnInit, ChangeDetectionStrategy,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'edu-cb-test',
  templateUrl: './cb-test.component.html',
  styleUrls: ['./cb-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CbTestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  @Output("setConfig") setConfig = new EventEmitter();
  cbChecked = false;
  cbChange(){
    // this.setConfig.emit({key: "isPassword", value: !this.isVisible})
    this.setConfig.emit({key:"hasError", value :this.cbChecked})
   
  }

}
