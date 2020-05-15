import { Component, ChangeDetectionStrategy, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'edu-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderNavComponent {
  @ContentChild('selectedTemplate', {static: false})
  selectedTemplateRef: TemplateRef<any>;
}
