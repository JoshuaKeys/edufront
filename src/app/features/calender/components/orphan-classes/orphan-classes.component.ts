import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ClassModel } from 'src/app/shared/models/class.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'edu-orphan-classes',
  templateUrl: './orphan-classes.component.html',
  styleUrls: ['./orphan-classes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrphanClassesComponent implements OnInit {
  @Input() orphanedClasses: Observable<ClassModel[]>;
  constructor() { }

  ngOnInit(): void {
  }

}
