import { ESCAPE, hasModifierKey } from '@angular/cdk/keycodes';
import { GlobalPositionStrategy, OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { DrawerConfig, DrawerPosition } from './config';
import { DrawerContainerComponent } from './drawer-container/drawer-container.component';

// Counter for unique drawer ids.
let uniqueId = 0;

/** Possible states of the lifecycle of a drawer. */
export const enum DrawerState {
  OPEN,
  CLOSING,
  CLOSED
}

/**
 * Reference to a drawer opened via the Drawer service.
 */
export class DrawerRef<T, R = any> {
  /** The instance of component opened into the drawer. */
  componentInstance: T;

  /** Whether the user is allowed to close the drawer. */
  disableClose: boolean | undefined = this._containerInstance._config
    .disableClose;

  /** Subject for notifying the user that the drawer has finished opening. */
  private readonly _afterOpened = new Subject<void>();

  /** Subject for notifying the user that the drawer has finished closing. */
  private readonly _afterClosed = new Subject<R | undefined>();

  /** Subject for notifying the user that the drawer has started closing. */
  private readonly _beforeClosed = new Subject<R | undefined>();

  /** Subject for notifying the user that the drawer has started closing. */
  private readonly _beforeOpened = new Subject<R | undefined>();

  /** Result to be passed to afterClosed. */
  private _result: R | undefined;

  /** Handle to the timeout that's running as a fallback in case the exit animation doesn't fire. */
  private _closeFallbackTimeout: any;

  /** Current state of the drawer. */
  private _state = DrawerState.OPEN;

  constructor(
    private _overlayRef: OverlayRef,
    public _containerInstance: DrawerContainerComponent,
    readonly id: string = `aside-drawer-${uniqueId++}`
  ) {
    // // Pass the id along to the container.
    _containerInstance._id = id;

    _containerInstance._animationStateChanged
      .pipe(
        filter(
          event => event.phaseName === 'start' && event.toState === 'enter'
        ),
        take(1)
      )
      .subscribe(() => {
        this._beforeOpened.next();
        this._beforeOpened.complete();
      });

    // // Emit when opening animation completes
    _containerInstance._animationStateChanged
      .pipe(
        filter(
          event => event.phaseName === 'done' && event.toState === 'enter'
        ),
        take(1)
      )
      .subscribe(() => {
        this._afterOpened.next();
        this._afterOpened.complete();
      });

    // // Dispose overlay when closing animation is complete
    _containerInstance._animationStateChanged
      .pipe(
        filter(event => event.phaseName === 'done' && event.toState === 'exit'),
        take(1)
      )
      .subscribe(() => {
        clearTimeout(this._closeFallbackTimeout);
        this._overlayRef.dispose();
      });

    _overlayRef.detachments().subscribe(() => {
      this._beforeClosed.next(this._result);
      this._beforeClosed.complete();
      this._afterClosed.next(this._result);
      this._afterClosed.complete();
      this.componentInstance = null!;
      this._overlayRef.dispose();
    });

    _overlayRef
      .keydownEvents()
      .pipe(
        filter(event => {
          return (
            event.keyCode === ESCAPE &&
            !this.disableClose &&
            !hasModifierKey(event)
          );
        })
      )
      .subscribe(event => {
        event.preventDefault();
        this.close();
      });

    _overlayRef.backdropClick().subscribe(() => {
      if (this.disableClose) {
        this._containerInstance._recaptureFocus();
      } else {
        this.close();
      }
    });
  }

  /**
   * Close the drawer.
   * @param drawerResult Optional result to return to the drawer opener.
   */
  close(drawerResult?: R): void {
    this._result = drawerResult;

    // // Transition the backdrop in parallel to the drawer.
    this._containerInstance._animationStateChanged
      .pipe(
        filter(event => event.phaseName === 'start'),
        take(1)
      )
      .subscribe(event => {
        this._beforeClosed.next(drawerResult);
        this._beforeClosed.complete();
        this._state = DrawerState.CLOSED;
        this._overlayRef.detachBackdrop();

        // The logic that disposes of the overlay depends on the exit animation completing, however
        // it isn't guaranteed if the parent view is destroyed while it's running. Add a fallback
        // timeout which will clean everything up if the animation hasn't fired within the specified
        // amount of time plus 100ms. We don't need to run this outside the NgZone, because for the
        // vast majority of cases the timeout will have been cleared before it has the chance to fire.
        this._closeFallbackTimeout = setTimeout(() => {
          this._overlayRef.dispose();
        }, event.totalTime + 100);
      });

    this._containerInstance._startExitAnimation();
    this._state = DrawerState.CLOSING;
  }

  /**
   * Gets an observable that is notified when the drawer is finished opening.
   */
  afterOpened(): Observable<void> {
    return this._afterOpened.asObservable();
  }

  /**
   * Gets an observable that is notified when the drawer is finished closing.
   */
  afterClosed(): Observable<R | undefined> {
    return this._afterClosed.asObservable();
  }

  /**
   * Gets an observable that is notified when the drawer has started closing.
   */
  beforeClosed(): Observable<R | undefined> {
    return this._beforeClosed.asObservable();
  }

  /**
   * Gets an observable that is notified when the drawer has started opening.
   */
  beforeOpened(): Observable<R | undefined> {
    return this._beforeOpened.asObservable();
  }

  /**
   * Gets an observable that emits when the overlay's backdrop has been clicked.
   */
  backdropClick(): Observable<MouseEvent> {
    return this._overlayRef.backdropClick();
  }

  /**
   * Gets an observable that emits when keydown events are targeted on the overlay.
   */
  keydownEvents(): Observable<KeyboardEvent> {
    return this._overlayRef.keydownEvents();
  }

  /**
   * Updates the drawer's position.
   * @param position New drawer position.
   */
  updatePosition(position?: DrawerPosition): this {
    let strategy = this._getPositionStrategy();

    if (position && (position.left || position.right)) {
      position.left
        ? strategy.left(position.left)
        : strategy.right(position.right);
    } else {
      strategy.centerHorizontally();
    }

    if (position && (position.top || position.bottom)) {
      position.top
        ? strategy.top(position.top)
        : strategy.bottom(position.bottom);
    } else {
      strategy.centerVertically();
    }

    this._overlayRef.updatePosition();

    return this;
  }

  /**
   * Updates the drawer's width and height.
   * @param width New width of the drawer.
   * @param height New height of the drawer.
   */
  updateSize(width: string = '', height: string = ''): this {
    this._getPositionStrategy()
      .width(width)
      .height(height);
    this._overlayRef.updatePosition();
    return this;
  }

  /** Add a CSS class or an array of classes to the overlay pane. */
  addPanelClass(classes: string | string[]): this {
    this._overlayRef.addPanelClass(classes);
    return this;
  }

  /** Remove a CSS class or an array of classes from the overlay pane. */
  removePanelClass(classes: string | string[]): this {
    this._overlayRef.removePanelClass(classes);
    return this;
  }

  /** Gets the current state of the drawer's lifecycle. */
  getState(): DrawerState {
    return this._state;
  }

  /** Fetches the position strategy object from the overlay ref. */
  private _getPositionStrategy(): GlobalPositionStrategy {
    return this._overlayRef.getConfig()
      .positionStrategy as GlobalPositionStrategy;
  }
}
