import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { StudentsXClassesModel } from '../../models/students-x-classes.model';
import { StudentsCommunicatorService } from '../../services/students-communicator.service';

@Component({
  selector: 'edu-student-chip',
  templateUrl: './student-chip.component.html',
  styleUrls: ['./student-chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentChipComponent implements OnInit {
  @Input() student: StudentsXClassesModel;
  constructor(private studentsCommuncator: StudentsCommunicatorService) { }

  ngOnInit(): void {
  }
  onEdit(student: StudentsXClassesModel) {
    this.studentsCommuncator.editStudent({ profileDto: student })
  }
  onDelete(student: StudentsXClassesModel) {
    this.studentsCommuncator.removeStudent({ profileDto: student })
  }
}
