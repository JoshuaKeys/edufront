import {
  Injectable,
  TemplateRef,
  Injector,
  StaticProvider,
  InjectionToken
} from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import {
  ComponentPortal,
  ComponentType,
  TemplatePortal
} from '@angular/cdk/portal';
import { DialogConfig } from './config';
import { DialogContainerComponent } from './dialog-container/dialog-container.component';
import { DialogRef } from './dialog-ref';
import { Subject, of as observableOf } from 'rxjs';
import { Directionality } from '@angular/cdk/bidi';

export const DIALOG_DATA = new InjectionToken<any>('AsideDialogData');

/**
 * Dialog Service can be used to open modal dialogs
 * A dialog is opened by calling the open method with a component to be loaded and an optional config object.
 * The open method will return an instance of DialogRef.
 * The DialogRef provides a handle on the opened dialog.
 * It can be used to close the dialog and to receive notification when the dialog has been closed.
 */

@Injectable()
export class DialogService {
  /** Keeps track of the currently-open dialogs. */
  openDialogs: DialogRef<any>[] = [];

  constructor(private _overlay: Overlay, private _injector: Injector) {}

  open<T>(componentOrTemplateRef: ComponentType<T>, config?: DialogConfig) {
    config = _applyConfigDefaults(config, new DialogConfig());
    const overlayConfig = this._getOverlayConfig(config);
    const overlayRef = this._overlay.create(overlayConfig);
    const containerRef = this._attachDialogContainer(overlayRef, config);
    const dialogRef = this._attachDialogContent<T>(
      componentOrTemplateRef,
      containerRef,
      overlayRef,
      config
    );

    this.openDialogs.push(dialogRef);
    dialogRef.beforeClosed().subscribe(() => this._removeOpenDialog(dialogRef));

    return dialogRef;
  }

  private _attachDialogContainer(
    overlay: OverlayRef,
    config: DialogConfig
  ): DialogContainerComponent {
    const userInjector =
      config && config.viewContainerRef && config.viewContainerRef.injector;
    const injector = Injector.create({
      parent: userInjector || this._injector,
      providers: [{ provide: DialogConfig, useValue: config }]
    });

    const containerPortal = new ComponentPortal(
      DialogContainerComponent,
      config.viewContainerRef,
      injector,
      config.componentFactoryResolver
    );
    const containerRef = overlay.attach<DialogContainerComponent>(
      containerPortal
    );

    return containerRef.instance;
  }

  private _attachDialogContent<T>(
    componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
    dialogContainer: DialogContainerComponent,
    overlayRef: OverlayRef,
    config: DialogConfig
  ) {
    // Create a reference to the dialog we're creating in order to give the user a handle
    // to modify and close it.
    const dialogRef = new DialogRef<T>(overlayRef, dialogContainer, config.id);

    if (componentOrTemplateRef instanceof TemplateRef) {
      dialogContainer.attachTemplatePortal(
        new TemplatePortal<T>(componentOrTemplateRef, null!, <any>{
          $implicit: config.data,
          dialogRef
        })
      );
    } else {
      const injector = this._createInjector<T>(
        config,
        dialogRef,
        dialogContainer
      );
      const contentRef = dialogContainer.attachComponentPortal<T>(
        new ComponentPortal(
          componentOrTemplateRef,
          config.viewContainerRef,
          injector
        )
      );

      dialogRef.componentInstance = contentRef.instance;
    }

    return dialogRef;
  }

  private _createInjector<T>(
    config: DialogConfig,
    dialogRef: DialogRef<T>,
    dialogContainer: DialogContainerComponent
  ): Injector {
    const userInjector =
      config && config.viewContainerRef && config.viewContainerRef.injector;

    // The DialogContainer is injected in the portal as the DialogContainer and the dialog's
    // content are created out of the same ViewContainerRef and as such, are siblings for injector
    // purposes. To allow the hierarchy that is expected, the DialogContainer is explicitly
    // added to the injection tokens.
    const providers: StaticProvider[] = [
      { provide: DialogContainerComponent, useValue: dialogContainer },
      { provide: DIALOG_DATA, useValue: config.data },
      { provide: DialogRef, useValue: dialogRef }
    ];

    if (
      config.direction &&
      (!userInjector ||
        !userInjector.get<Directionality | null>(Directionality, null))
    ) {
      providers.push({
        provide: Directionality,
        useValue: { value: config.direction, change: observableOf() }
      });
    }

    return Injector.create({
      parent: userInjector || this._injector,
      providers
    });
  }

  private _getOverlayConfig(dialogConfig: DialogConfig): OverlayConfig {
    const state = new OverlayConfig({
      positionStrategy: this._overlay.position().global(),
      hasBackdrop: true,
      panelClass: dialogConfig.panelClass
    });

    return state;
  }

  private _removeOpenDialog(dialogRef: DialogRef<any>) {
    console.log('remove opened dialog');
    const index = this.openDialogs.indexOf(dialogRef);

    if (index > -1) {
      this.openDialogs.splice(index, 1);
    }
  }

  /**
   * Finds an open dialog by its id.
   * @param id ID to use when looking up the dialog.
   */
  getDialogById(id: string): DialogRef<any> | undefined {
    return this.openDialogs.find(dialog => dialog.id === id);
  }
}

function _applyConfigDefaults(
  config?: DialogConfig,
  defaultOptions?: DialogConfig
): DialogConfig {
  return { ...defaultOptions, ...config };
}
