import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'edu-security-tab-question',
  templateUrl: './security-tab-question.component.html',
  styleUrls: ['./security-tab-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecurityTabQuestionComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  @Output('backButtonClicked') backButtonClicked = new EventEmitter();
  //valid values [1, 2, 2.1,  3]
  activeScreenNumber = 1;
  isActiveScreen(param) {
    return this.activeScreenNumber == param;
  }

  backToPasswordTab() {
    console.log('emitting  backButtonClicked');
    this.backButtonClicked.emit();
  }
}
