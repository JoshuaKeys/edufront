import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { PreviewModel } from '../../models/preview.model';
import { map, tap } from 'rxjs/operators';
import { ClassModel } from 'src/app/shared/models/class.model';
import { buildRangePipe } from '../../utilities';

@Component({
  selector: 'edu-days-of-week-preview',
  templateUrl: './days-of-week-preview.component.html',
  styleUrls: ['./days-of-week-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DaysOfWeekPreviewComponent implements OnInit {
  @Input() previewState: Observable<PreviewModel>;
  constructor() { }

  ngOnInit(): void {
  }
  computeClasses(classes: ClassModel[]){
    const grades = classes.map(classItem => classItem.grade).sort((a, b)=> a -b);
    const result = buildRangePipe(grades);
    return result
  }
  allIsUniform() {
    return this.previewState.pipe(
      map(preview => {
        const teachingDays = preview.teachingDays.items
        const classesGroups = preview.teachingDays.classesAndGroupItems ? preview.teachingDays.classesAndGroupItems : [];

        for(let i = 0; i < classesGroups.length; i++) {
          for(let j = 0; j < classesGroups[i].teachingDays.length; j++) {
            if(classesGroups[i].teachingDays[j].selected === teachingDays[j].selected) {
              // console.log(classesGroups[i].teachingDays[i])
              continue
            } else {
              console.log(classesGroups[i].teachingDays[j].selected, teachingDays[j].selected)
              return false;
            }
          }
        }
        return true;
      }),
      tap(retVal => {
        console.log(retVal)
      })
    )
  }
}
