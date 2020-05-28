import { Component, OnInit, ChangeDetectionStrategy , Input, ElementRef} from '@angular/core';

@Component({
  selector: 'edu-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent implements OnInit {


  constructor(private el:ElementRef) { }

  ngOnInit(): void {
    this.setElementID();
 
  }


  setElementID(){
    if(this.elementId == undefined && this.el.nativeElement.getAttribute("formcontrolname") !== undefined){
      this.elementId = this.el.nativeElement.getAttribute("formcontrolname");
    } 
}

  
  @Input("elementId") elementId;
  @Input("alignment") alignment =  "right";//top,bottom, left,right(default )
  isChecked = false;
}
