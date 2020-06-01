import { Component, OnInit, ChangeDetectionStrategy,HostListener ,ChangeDetectorRef, Input, Renderer2, ElementRef} from '@angular/core';

@Component({
  selector: 'edu-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopoverComponent implements OnInit {

  constructor(private el:ElementRef, private renderer:Renderer2, private cd:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.renderer.addClass(this.el.nativeElement, this.alignment);
    this.renderer.addClass(this.el.nativeElement, `pointer-${this.pointerAlignment}`);
    // this.cd.markForCheck();
  }
  
  //possible values [top, left, right, bottom]
  @Input("alignment") alignment = "bottom"
  //possible values [left, center, right] and it only works for top and bottom
  @Input("pointerAlignment") pointerAlignment = "center"

  @HostListener('document:click', ['$event']) clickedOutside($event){
    // here you can hide your menu
    console.log("CLICKED OUTSIDE");
  }
  @HostListener('click', ['$event']) onClick($event){
    $event.preventDefault();
    $event.stopPropagation();  // <- that will stop propagation on lower layers
    console.log("CLICKED INSIDE, MENU WON'T HIDE");
  }
  // clickedInside($event: Event){
  //   $event.preventDefault();
  //   $event.stopPropagation();  // <- that will stop propagation on lower layers
  //   console.log("CLICKED INSIDE, MENU WON'T HIDE");
  // } 
}
