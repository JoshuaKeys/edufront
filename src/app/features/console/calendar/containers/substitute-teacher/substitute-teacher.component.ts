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
import { ExtendedDatepickerComponent } from '../../components/extended-datepicker/extended-datepicker.component';
import { TeacherService } from 'src/app/root-store/teacher.service';
import { AcademicYearService } from 'src/app/root-store/academicYear.service';
import { ITeacher } from 'src/app/shared/models/subject.model';

@Component({
  selector: 'edu-substitute-teacher',
  templateUrl: './substitute-teacher.component.html',
  styleUrls: ['./substitute-teacher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubstituteTeacherComponent implements OnInit {
  searchTeacher$ = new BehaviorSubject(null);
  teachers$ = combineLatest([
    this.teacherService.entities$,
    this.searchTeacher$
  ]).pipe(
    map(([teachers, query]) => {
      if (!query || (query && query.length === 0)) {
        return teachers;
      }
      return teachers.filter(
        s =>
          s.firstName.toLowerCase().includes(query.toLowerCase()) ||
          s.lastName.toLowerCase().includes(query.toLowerCase())
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
    private teacherService: TeacherService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.teacherService.getAll();
  }

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
      this.onTargetTeacherSelected(param.value);
    }
    if (param && param.id === 'datepicker') {
      this.onDateChanged(param.value);
    }
    if (param && param.id === 'selectedTeacher') {
      this.reset();
    }
    if (param && param.id === 'datepickerInput1' && param.event === 'edit') {
      this.onEditDaterange();
    }
    this.cd.markForCheck();
  }

  onEditDaterange() {
    this.displayArr = [
      {
        component: SelectedTeacherComponent,
        param: { teacher: this.form.get('targetTeacher').value },
        output: ['editTeacher'],
        id: 'selectedTeacher'
      },
      {
        component: InputComponent,
        param: { type: 'datepicker', value: this.form.get('dateRange').value },
        output: ['update'],
        id: 'datepickerInput'
      },
      {
        component: ExtendedDatepickerComponent,
        param: {},
        output: ['dateChange'],
        id: 'datepicker'
      }
    ];
  }

  onDateChanged(dateRange: string) {
    console.log('Should show Subject and Teachers picker to replace');
    this.form.get('dateRange').patchValue(dateRange);
    this.displayArr = [
      {
        component: SelectedTeacherComponent,
        param: { teacher: this.form.get('targetTeacher').value },
        output: ['editTeacher'],
        id: 'selectedTeacher'
      },
      {
        component: InputComponent,
        param: { type: 'datepicker', value: dateRange },
        output: ['update', 'edit'],
        id: 'datepickerInput1'
      }
    ];
  }

  onTargetTeacherSelected(teacher: ITeacher) {
    this.form.get('targetTeacher').patchValue(teacher);
    this.displayArr = [
      {
        component: SelectedTeacherComponent,
        param: { teacher },
        output: ['editTeacher'],
        id: 'selectedTeacher'
      },
      {
        component: InputComponent,
        param: { type: 'datepicker' },
        output: ['update'],
        id: 'datepickerInput'
      },
      {
        component: ExtendedDatepickerComponent,
        param: {},
        output: ['dateChange'],
        id: 'datepicker'
      }
    ];
  }

  reset() {
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
}
