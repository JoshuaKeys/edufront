import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'edu-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TermsComponent implements OnInit {
  @Input() terms: number;
  @Input() active: number;
  @Output() toggleActive = new EventEmitter<number>()
  termsArray: number[];
  constructor() { }

  ngOnInit(): void {
    this.termsArray = new Array(this.terms);
    for(let i = 0; i < this.termsArray.length; i++) {
      this.termsArray[i] = i+1;
    }
  }
  onToggleActive(item: number) {
    this.toggleActive.emit(item);
  }
}
