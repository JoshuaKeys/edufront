import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerContainerComponent } from './drawer-container/drawer-container.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { DrawerService } from './drawer.service';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
  declarations: [DrawerContainerComponent],
  imports: [CommonModule, OverlayModule, PortalModule],
  providers: [DrawerService],
  entryComponents: [DrawerContainerComponent],
  exports: [DrawerContainerComponent]
})
export class DrawerModule {}
