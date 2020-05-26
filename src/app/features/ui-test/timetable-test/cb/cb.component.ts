import { Component, OnInit, ChangeDetectionStrategy,Input, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'edu-cb',
  templateUrl: './cb.component.html',
  styleUrls: ['./cb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CbComponent implements OnInit {
  @Output() onChange = new EventEmitter();
  @Input("id") id; 
  @Input("initialValue") initialValue;
  constructor() { }
  value ;
  ngOnInit(): void {
    this.value = this.initialValue
  }
 


  changeInComponent( ){
    console.log("cb")
    this.onChange.emit( this.value)
  }
}
