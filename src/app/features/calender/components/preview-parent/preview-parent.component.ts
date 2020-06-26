import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { PreviewModel } from '../../models/preview.model';
import { CalendarModel } from '../../models/calendar.model';
import { TeachingDay } from '../../models/teaching-day.model';
import { periodUniformity } from '../../utilities';
import { ClassGroupModel } from '../../models/class-group.model';

@Component({
  selector: 'edu-preview-parent',
  templateUrl: './preview-parent.component.html',
  styleUrls: ['./preview-parent.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewParentComponent implements OnInit {
  @Input() previewState: Observable<PreviewModel>;
  previewArray: Array<{name: string, item: any}> = [];

  constructor() { }
  debug(item) {
    console.log(item);
  }
  hasSelectedTeachingDays(teachingDays: TeachingDay[]) {
    return teachingDays.find(teachingDay=> teachingDay.selected) ? true : false;
  }
  ngOnInit(): void {
   
    this.previewState.subscribe(previewState=> {
      for(let preview in previewState) {
        this.previewArray.push({name: preview, item: previewState[preview]})
      }
    })

  }
  isUniform(classesAndGroups: ClassGroupModel[]) {
    const periods = classesAndGroups.map(classesAndGroup=> classesAndGroup.periods);
    return periodUniformity(periods);
  }
  

}
