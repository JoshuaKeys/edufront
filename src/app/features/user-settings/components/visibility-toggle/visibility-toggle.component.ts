import { Component, OnInit, ChangeDetectionStrategy, HostListener, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'visibility-toggle',
  templateUrl: './visibility-toggle.component.html',
  styleUrls: ['./visibility-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VisibilityToggleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  isVisible=false;
  @Output("setConfig") setConfig = new EventEmitter();

  @HostListener("click") onclick(){
    this.isVisible = !this.isVisible;
    this.setConfig.emit({key: "isPassword", value: !this.isVisible})
  }
  


}
