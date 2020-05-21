import { Component, OnInit, ChangeDetectionStrategy,Renderer2,ElementRef ,    HostListener, QueryList, ContentChild} from '@angular/core';
import { SelectService } from "../select.service"
 

@Component({
  selector: 'edu-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionComponent  {
 
  constructor( private el: ElementRef, private renderer:Renderer2, private selectService:SelectService) { 
     
  }

 
 
  @HostListener("valueChange",["$event"]) onValueChange($event){
    this.selectService.setActiveOption($event);
  }

 

}
