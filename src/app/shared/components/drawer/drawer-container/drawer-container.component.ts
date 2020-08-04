import {
  Component,
  ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  EventEmitter,
  Inject,
  Optional,
  ChangeDetectorRef,
  ViewChild,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AnimationEvent } from '@angular/animations';
// import {matDrawerAnimations} from './drawer-animations';
import {
  BasePortalOutlet,
  ComponentPortal,
  CdkPortalOutlet,
  TemplatePortal,
  DomPortal
} from '@angular/cdk/portal';
import { FocusTrap, FocusTrapFactory } from '@angular/cdk/a11y';
import { DrawerConfig } from '../config';
import { DrawerAnimations } from './container-animation';

export function throwDrawerContentAlreadyAttachedError() {
  throw Error(
    'Attempting to attach drawer content after content is already attached'
  );
}

@Component({
  selector: 'edu-drawer-container',
  templateUrl: './drawer-container.component.html',
  styleUrls: ['./drawer-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // Using OnPush for drawers caused some G3 sync issues. Disabled until we can track them down.
  // tslint:disable-next-line:validate-decorators
  changeDetection: ChangeDetectionStrategy.Default,
  animations: [DrawerAnimations.drawerContainer],
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    class: 'drawer-container',
    tabindex: '-1',
    'aria-modal': 'true',
    '[attr.id]': '_id',
    '[attr.role]': '_config.role',
    '[attr.aria-labelledby]': '_config.ariaLabel ? null : _ariaLabelledBy',
    '[attr.aria-label]': '_config.ariaLabel',
    '[attr.aria-describedby]': '_config.ariaDescribedBy || null',
    '[@drawerContainer]': '_state',
    '(@drawerContainer.start)': '_onAnimationStart($event)',
    '(@drawerContainer.done)': '_onAnimationDone($event)'
  }
})
export class DrawerContainerComponent extends BasePortalOutlet {
  // tslint:disable: variable-name
  private _document: Document;

  /** The portal outlet inside of this container into which the drawer content will be loaded. */
  @ViewChild(CdkPortalOutlet, { static: true }) _portalOutlet: CdkPortalOutlet;

  /** The class that traps and manages focus within the drawer. */
  private _focusTrap: FocusTrap;

  /** Element that was focused before the drawer was opened. Save this to restore upon close. */
  private _elementFocusedBeforeDrawerWasOpened: HTMLElement | null = null;

  /** State of the drawer animation. */
  _state: 'void' | 'enter' | 'exit' = 'enter';

  /** Emits when an animation state changes. */
  _animationStateChanged = new EventEmitter<AnimationEvent>();

  /** ID of the element that should be considered as the drawer's label. */
  _ariaLabelledBy: string | null;

  /** ID for the container DOM element. */
  _id: string;

  constructor(
    private renderer: Renderer2,
    private _elementRef: ElementRef,
    private _focusTrapFactory: FocusTrapFactory,
    private _changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(DOCUMENT) _document: any,
    /** The drawer configuration. */
    public _config: DrawerConfig
  ) {
    super();
    this._ariaLabelledBy = _config.ariaLabelledBy || null;
    this._document = _document;
  }

  /**
   * Attach a ComponentPortal as content to this drawer container.
   * @param portal Portal to be attached as the drawer content.
   */
  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    if (!this._portalOutlet) {
      throwDrawerContentAlreadyAttachedError();
    }
    if (this._portalOutlet.hasAttached()) {
      throwDrawerContentAlreadyAttachedError();
    }

    this._savePreviouslyFocusedElement();
    return this._portalOutlet.attachComponentPortal(portal);
  }

  /**
   * Attach a TemplatePortal as content to this drawer container.
   * @param portal Portal to be attached as the drawer content.
   */
  attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    if (this._portalOutlet.hasAttached()) {
      throwDrawerContentAlreadyAttachedError();
    }

    this._savePreviouslyFocusedElement();
    return this._portalOutlet.attachTemplatePortal(portal);
  }

  /**
   * Attaches a DOM portal to the drawer container.
   * @param portal Portal to be attached.
   * @deprecated To be turned into a method.
   * @breaking-change 10.0.0
   */
  attachDomPortal = (portal: DomPortal) => {
    if (this._portalOutlet.hasAttached()) {
      throwDrawerContentAlreadyAttachedError();
    }

    this._savePreviouslyFocusedElement();
    return this._portalOutlet.attachDomPortal(portal);
  };

  /** Moves focus back into the drawer if it was moved out. */
  _recaptureFocus() {
    if (!this._containsFocus()) {
      const focusWasTrapped = this._getFocusTrap().focusInitialElement();

      if (!focusWasTrapped) {
        this._elementRef.nativeElement.focus();
      }
    }
  }

  /** Moves the focus inside the focus trap. */
  private _trapFocus() {
    // If we were to attempt to focus immediately, then the content of the drawer would not yet be
    // ready in instances where change detection has to run first. To deal with this, we simply
    // wait for the microtask queue to be empty.
    if (this._config.autoFocus) {
      this._getFocusTrap().focusInitialElementWhenReady();
    } else if (!this._containsFocus()) {
      // Otherwise ensure that focus is on the drawer container. It's possible that a different
      // component tried to move focus while the open animation was running. See:
      // https://github.com/angular/components/issues/16215. Note that we only want to do this
      // if the focus isn't inside the drawer already, because it's possible that the consumer
      // turned off `autoFocus` in order to move focus themselves.
      this._elementRef.nativeElement.focus();
    }
  }

  /** Restores focus to the element that was focused before the drawer opened. */
  private _restoreFocus() {
    const toFocus = this._elementFocusedBeforeDrawerWasOpened;

    // We need the extra check, because IE can set the `activeElement` to null in some cases.
    if (
      this._config.restoreFocus &&
      toFocus &&
      typeof toFocus.focus === 'function'
    ) {
      const activeElement = this._document.activeElement;
      const element = this._elementRef.nativeElement;

      // Make sure that focus is still inside the drawer or is on the body (usually because a
      // non-focusable element like the backdrop was clicked) before moving it. It's possible that
      // the consumer moved it themselves before the animation was done, in which case we shouldn't
      // do anything.
      if (
        !activeElement ||
        activeElement === this._document.body ||
        activeElement === element ||
        element.contains(activeElement)
      ) {
        toFocus.focus();
      }
    }

    if (this._focusTrap) {
      this._focusTrap.destroy();
    }
  }

  /** Saves a reference to the element that was focused before the drawer was opened. */
  private _savePreviouslyFocusedElement() {
    if (this._document) {
      this._elementFocusedBeforeDrawerWasOpened = this._document
        .activeElement as HTMLElement;

      // Note that there is no focus method when rendering on the server.
      if (this._elementRef.nativeElement.focus) {
        // Move focus onto the drawer immediately in order to prevent the user from accidentally
        // opening multiple drawers at the same time. Needs to be async, because the element
        // may not be focusable immediately.
        Promise.resolve().then(() => this._elementRef.nativeElement.focus());
      }
    }
  }

  /** Returns whether focus is inside the drawer. */
  private _containsFocus() {
    const element = this._elementRef.nativeElement;
    const activeElement = this._document.activeElement;
    return element === activeElement || element.contains(activeElement);
  }

  /** Gets the focus trap associated with the drawer. */
  private _getFocusTrap() {
    if (!this._focusTrap) {
      this._focusTrap = this._focusTrapFactory.create(
        this._elementRef.nativeElement
      );
    }

    return this._focusTrap;
  }

  /** Callback, invoked whenever an animation on the host completes. */
  _onAnimationDone(event: AnimationEvent) {
    if (event.toState === 'enter') {
      this._trapFocus();
      this.renderer.addClass(this._elementRef.nativeElement, 'ready');
    } else if (event.toState === 'exit') {
      this._restoreFocus();
    }

    this._animationStateChanged.emit(event);
  }

  /** Callback, invoked when an animation on the host starts. */
  _onAnimationStart(event: AnimationEvent) {
    this._animationStateChanged.emit(event);
  }

  /** Starts the drawer exit animation. */
  _startExitAnimation(): void {
    this.renderer.removeClass(this._elementRef.nativeElement, 'ready');
    this._state = 'exit';

    // Mark the container for check so it can react if the
    // view container is using OnPush change detection.
    this._changeDetectorRef.markForCheck();
  }
}