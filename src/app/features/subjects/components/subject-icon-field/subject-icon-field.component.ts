import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  forwardRef,
  Renderer2,
  ViewChild,
  ElementRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'edu-subject-icon-field',
  templateUrl: './subject-icon-field.component.html',
  styleUrls: ['./subject-icon-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SubjectIconFieldComponent)
    }
  ]
})
export class SubjectIconFieldComponent implements OnInit, ControlValueAccessor {
  constructor(private renderer: Renderer2) {}
  value: string;
  @ViewChild('subjectName') subjectName: ElementRef<HTMLInputElement>;
  onValueChange: (text: string) => any;
  ngOnInit(): void {}

  popoverToogle = false;
  writeValue(val: any) {
    if (val === null) {
      this.renderer.setProperty(this.subjectName.nativeElement, 'value', '');
      return;
    }
    this.value = val;
  }
  registerOnChange(fn: any) {
    this.onValueChange = fn;
  }
  registerOnTouched(fn: any) {}

  onTextChange(event) {
    this.onValueChange(event.target.value);
  }

  closePopover() {
    this.popoverToogle = !this.popoverToogle;
  }
}
