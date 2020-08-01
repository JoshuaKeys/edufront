import { DrawerContainerComponent } from './drawer-container/drawer-container.component';
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
import { DrawerConfig } from './config';
import { DrawerRef } from './drawer-ref';
import { Subject, of as observableOf } from 'rxjs';
import { Directionality } from '@angular/cdk/bidi';

export const DRAWER_DATA = new InjectionToken<any>('AsideDrawerData');

/**
 * Drawer Service can be used to open modal drawers
 * A drawer is opened by calling the open method with a component to be loaded and an optional config object.
 * The open method will return an instance of DrawerRef.
 * The DrawerRef provides a handle on the opened drawer.
 * It can be used to close the drawer and to receive notification when the drawer has been closed.
 */

@Injectable()
export class DrawerService {
  /** Keeps track of the currently-open drawers. */
  openDrawers: DrawerRef<any>[] = [];

  constructor(private _overlay: Overlay, private _injector: Injector) {}

  open<T>(componentOrTemplateRef: ComponentType<T>, config?: DrawerConfig) {
    config = _applyConfigDefaults(config, new DrawerConfig());
    const overlayConfig = this._getOverlayConfig(config);
    const overlayRef = this._overlay.create(overlayConfig);
    const containerRef = this._attachDrawerContainer(overlayRef, config);
    const drawerRef = this._attachDrawerContent<T>(
      componentOrTemplateRef,
      containerRef,
      overlayRef,
      config
    );

    this.openDrawers.push(drawerRef);
    drawerRef.beforeClosed().subscribe(() => this._removeOpenDrawer(drawerRef));

    return drawerRef;
  }

  private _attachDrawerContainer(
    overlay: OverlayRef,
    config: DrawerConfig
  ): DrawerContainerComponent {
    const userInjector =
      config && config.viewContainerRef && config.viewContainerRef.injector;
    const injector = Injector.create({
      parent: userInjector || this._injector,
      providers: [{ provide: DrawerConfig, useValue: config }]
    });

    const containerPortal = new ComponentPortal(
      DrawerContainerComponent,
      config.viewContainerRef,
      injector,
      config.componentFactoryResolver
    );
    const containerRef = overlay.attach<DrawerContainerComponent>(
      containerPortal
    );

    return containerRef.instance;
  }

  private _attachDrawerContent<T>(
    componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
    drawerContainer: DrawerContainerComponent,
    overlayRef: OverlayRef,
    config: DrawerConfig
  ) {
    // Create a reference to the drawer we're creating in order to give the user a handle
    // to modify and close it.
    const drawerRef = new DrawerRef<T>(overlayRef, drawerContainer, config.id);

    if (componentOrTemplateRef instanceof TemplateRef) {
      drawerContainer.attachTemplatePortal(
        new TemplatePortal<T>(componentOrTemplateRef, null!, <any>{
          $implicit: config.data,
          drawerRef
        })
      );
    } else {
      const injector = this._createInjector<T>(
        config,
        drawerRef,
        drawerContainer
      );
      const contentRef = drawerContainer.attachComponentPortal<T>(
        new ComponentPortal(
          componentOrTemplateRef,
          config.viewContainerRef,
          injector
        )
      );

      drawerRef.componentInstance = contentRef.instance;
    }

    return drawerRef;
  }

  private _createInjector<T>(
    config: DrawerConfig,
    drawerRef: DrawerRef<T>,
    drawerContainer: DrawerContainerComponent
  ): Injector {
    const userInjector =
      config && config.viewContainerRef && config.viewContainerRef.injector;

    // The DrawerContainer is injected in the portal as the DrawerContainer and the drawer's
    // content are created out of the same ViewContainerRef and as such, are siblings for injector
    // purposes. To allow the hierarchy that is expected, the DrawerContainer is explicitly
    // added to the injection tokens.
    const providers: StaticProvider[] = [
      { provide: DrawerContainerComponent, useValue: drawerContainer },
      { provide: DRAWER_DATA, useValue: config.data },
      { provide: DrawerRef, useValue: drawerRef }
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

  private _getOverlayConfig(drawerConfig: DrawerConfig): OverlayConfig {
    const state = new OverlayConfig({
      positionStrategy: this._overlay.position().global(),
      hasBackdrop: true,
      panelClass: drawerConfig.panelClass
    });

    return state;
  }

  private _removeOpenDrawer(drawerRef: DrawerRef<any>) {
    console.log('remove opened drawer');
    const index = this.openDrawers.indexOf(drawerRef);

    if (index > -1) {
      this.openDrawers.splice(index, 1);
    }
  }

  /**
   * Finds an open drawer by its id.
   * @param id ID to use when looking up the drawer.
   */
  getDrawerById(id: string): DrawerRef<any> | undefined {
    return this.openDrawers.find(drawer => drawer.id === id);
  }
}

function _applyConfigDefaults(
  config?: DrawerConfig,
  defaultOptions?: DrawerConfig
): DrawerConfig {
  return { ...defaultOptions, ...config };
}
