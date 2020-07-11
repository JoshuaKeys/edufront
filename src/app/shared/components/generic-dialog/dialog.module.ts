import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogContainerComponent } from './dialog-container/dialog-container.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { DialogService } from './dialog.service';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
  declarations: [DialogContainerComponent],
  imports: [CommonModule, OverlayModule, PortalModule],
  providers: [DialogService],
  entryComponents: [DialogContainerComponent],
  exports: [DialogContainerComponent]
})
export class DialogModule {}
