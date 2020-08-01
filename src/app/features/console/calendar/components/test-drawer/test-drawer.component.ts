import { DRAWER_DATA } from './../../../../../shared/components/drawer/drawer.service';
import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { DrawerRef } from 'src/app/shared/components/drawer/drawer-ref';

@Component({
  selector: 'edu-test-drawer',
  templateUrl: './test-drawer.component.html',
  styleUrls: ['./test-drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestDrawerComponent implements OnInit {

  constructor(
    public dialogRef: DrawerRef<TestDrawerComponent>,
    @Inject(DRAWER_DATA)
    public data
  ) {}

  ngOnInit(): void {
  }

}
