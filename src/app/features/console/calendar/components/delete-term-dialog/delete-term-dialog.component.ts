import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject
} from '@angular/core';
import { DialogRef } from 'src/app/shared/components/generic-dialog/dialog-ref';
import { DIALOG_DATA } from 'src/app/shared/components/generic-dialog/dialog.service';
import { FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'edu-delete-term-dialog',
  templateUrl: './delete-term-dialog.component.html',
  styleUrls: ['./delete-term-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteTermDialogComponent implements OnInit {
  termCtrl = new FormControl(null, Validators.required);
  constructor(
    public dialogRef: DialogRef<DeleteTermDialogComponent>,
    @Inject(DIALOG_DATA)
    public data
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  get termTitle() {
    const { term } = this.data;
    const start = moment(term.termStart).format('DD MMM');
    const end = moment(term.termEnd).format('DD MMM');
    return `${start} - ${end}`;
  }

  onDelete() {
    this.dialogRef.close(this.termCtrl.value);
  }
  onCancel() {
    this.dialogRef.close();
  }
}
