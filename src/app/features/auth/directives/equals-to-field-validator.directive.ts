import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  // tslint:disable-next-line
  selector: '[equalsToField][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EqualsToFieldValidatorDirective, multi: true }]
})
export class EqualsToFieldValidatorDirective implements Validator {

  @Input('equalsToField') equalsToField: string;

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const otherField = control.root.get(this.equalsToField);

    return otherField && value !== otherField.value ? { equalsToField: false } : null;
  }

}
