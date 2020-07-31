import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef
} from '@angular/core';
import { Datepicker3Component } from 'src/app/shared/components/form-components/datepicker3/datepicker3.component';
import { DatepickerOptions } from 'src/app/shared/components/form-components/datepicker3';
import { InputComponent } from '../../components/input/input.component';
import { TeachersListComponent } from '../../components/teachers-list/teachers-list.component';
import { TimetableFacadeService } from 'src/app/services/timetable/timetable-facade.service';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectedTeacherComponent } from '../../components/selected-teacher/selected-teacher.component';

@Component({
  selector: 'edu-substitute-teacher',
  templateUrl: './substitute-teacher.component.html',
  styleUrls: ['./substitute-teacher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubstituteTeacherComponent implements OnInit {
  searchTeacher$ = new BehaviorSubject(null);
  teachers$ = combineLatest([
    this.timetableFacade.teachers$.pipe(
      map(r => {
        return [
          { firstName: 'Cecil', lastName: 'Doe' },
          { firstName: 'Jane', lastName: 'J' },
          { firstName: 'Jack', lastName: 'Jones' }
        ];
      })
    ),
    this.searchTeacher$
  ]).pipe(
    map(([teachers, query]) => {
      if (!query || (query && query.length === 0)) {
        return teachers;
      }
      return teachers.filter(
        s =>
          s.firstName.toLowerCase().includes(query) ||
          s.lastName.toLowerCase().includes(query)
      );
    })
  );

  datepickerOption: DatepickerOptions = {
    isRange: true,
    inline: true,
    displayFormat: 'DD-MM-YY'
  };
  displayArr = [];

  form = this.fb.group({
    targetTeacher: [null, Validators.required],
    dateRange: [null, Validators.required],
    subjects: [null, Validators.required],
    replacementTeacher: [null, Validators.required]
  });

  constructor(
    private timetableFacade: TimetableFacadeService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.displayArr = [
      {
        component: InputComponent,
        param: { type: 'teacher' },
        output: ['update'],
        id: 'targetTeacher'
      },
      {
        component: TeachersListComponent,
        param: { teachers: this.teachers$ },
        output: ['teacherSelect'],
        id: 'targetTeacherPicker'
      }
    ];
  }

  onChange(param) {
    console.log('updating title !!', param);
    if (param && param.id === 'targetTeacher') {
      this.searchTeacher$.next(param.value);
    }
    if (param && param.id === 'targetTeacherPicker') {
      //my work around is to just hide the components when you need

      // let selectedTeacherComp = this.displayArr.find(
      //   displayComponent => displayComponent.id === 'selectedTeacher'
      // );
      // selectedTeacherComp.param = { teacher: param.value };
      // selectedTeacherComp.hide = false;
      // let datepickerComp = this.displayArr.find(
      //   displayComponent => displayComponent.id === 'datepicker'
      // );
      // datepickerComp.hide = false;
      // let targetTeacherComp = this.displayArr.find(
      //   displayComponent => displayComponent.id === 'targetTeacher'
      // );
      // let targetTeacherPickerComp = this.displayArr.find(
      //   displayComponent => displayComponent.id === 'targetTeacherPicker'
      // );
      // targetTeacherComp.hide = true;
      // targetTeacherPickerComp.hide = true;
      // this.displayArr = [...this.displayArr];
      // this.form.get('targetTeacher').patchValue(param.value.profileId);
      this.displayArr = [
        {
          component: SelectedTeacherComponent,
          param: { teacher: param.value },
          output: [],
          id: 'selectedTeacher'
        },
        {
          component: InputComponent,
          param: { type: 'datepicker' },
          output: ['update'],
          id: 'datepicker'
        }
      ];
      this.displayArr = [...this.displayArr];
    }
    this.cd.markForCheck();
  }

  reset() {
    // this.displayArr = [
    //   {
    //     component: InputComponent,
    //     param: { type: 'teacher' },
    //     output: ['update'],
    //     id: 'targetTeacher'
    //   },
    //   {
    //     component: TeachersListComponent,
    //     param: { teachers: this.teachers$ },
    //     output: ['teacherSelect'],
    //     id: 'targetTeacherPicker'
    //   }
    // ];
  }
}
