import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'edu-group-box',
  templateUrl: './group-box.component.html',
  styleUrls: ['./group-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupBoxComponent implements OnInit {
  @Input() groupName: string;
  constructor() { }
  onDrop(ev: DragEvent) {
    ev.preventDefault();
    console.log(ev.defaultPrevented)
    console.log(ev.dataTransfer.items)
  }
  onDragOver(ev: DragEvent) {
    ev.preventDefault();
    console.log('Helllooooo')
  }
  ngOnInit(): void {
  }

}
