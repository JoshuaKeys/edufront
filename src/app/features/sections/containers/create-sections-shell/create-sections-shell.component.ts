import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-create-sections-shell',
  templateUrl: './create-sections-shell.component.html',
  styleUrls: ['./create-sections-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateSectionsShellComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
