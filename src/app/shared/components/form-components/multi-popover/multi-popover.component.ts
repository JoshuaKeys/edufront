import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ComponentFactoryResolver,
  ViewChildren,
  ViewContainerRef,
  AfterViewInit,
  QueryList,
  HostListener,
  ElementRef,
  Renderer2,
  ChangeDetectorRef,
  ComponentRef
} from '@angular/core';
import { MultiPopoverService } from './multi-popover.service';
import { ChildIdentifierDirective } from './child-identifier.directive';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { SampleDataTestComponent } from 'src/app/features/ui-test/sample-data-test/sample-data-test.component';
import { map, filter, delay, skip } from 'rxjs/operators';
@Component({
  selector: 'edu-multi-popover',
  templateUrl: './multi-popover.component.html',
  styleUrls: ['./multi-popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiPopoverComponent implements OnInit, AfterViewInit {
  constructor(
    private resolver: ComponentFactoryResolver,
    private service: MultiPopoverService,
    private el: ElementRef,
    private renderer: Renderer2,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.addClassBasedOnPointerValues();
    let currentIdxes = [];
    // this.service.componentIdArr$.pipe(delay(100)).subscribe(idx => {
    //   console.log('idx', idx);
    //   this.injectComponent(idx);
    // });

    this.service.newMultiPopoverId$
      .pipe(skip(1), delay(100))
      .subscribe(id => this.injectComponentByCompId(id));
  }
  ngAfterViewInit() {
    this.registerClickOnParent();
    // console.log('multi popover', this.componentArr, this.componentContainers);
  }
  @ViewChildren(ChildIdentifierDirective) identifierDirectives: QueryList<
    ChildIdentifierDirective
  >;
  @ViewChildren('componentContainer', { read: ViewContainerRef })
  componentContainers: QueryList<ViewContainerRef>;
  @Output('close') onClose = new EventEmitter();
  @Output('edu-open') openEvent = new EventEmitter();
  @Output('edu-close') closeEvent = new EventEmitter();
  @Input('alignment') alignment = 'bottom';
  //possible values [left, center, right] and it only works for top and bottom
  @Input('pointerAlignment') pointerAlignment = 'center';

  // need to implement getter/setter for this
  @Input('edu-components') componentArr = [];

  @HostListener('document:click', ['$event']) clickedOutside($event) {
    //close element when click is from outside
    if (!this.el.nativeElement.parentElement.contains($event.srcElement)) {
      // this.togglePopoverState();
      if (this.el.nativeElement.classList.contains('active')) {
        this.togglePopoverState();
        // this.renderer.removeClass(this.el.nativeElement, 'active');
        this.onClose.emit();
      }
    }
  }
  @HostListener('click', ['$event']) onClick($event) {
    //stops propagation on lower layers
    $event.preventDefault();
    // console.log(this.popoverOptionDir);
    // if (this.el.nativeElement.classList.contains('active')) {
    $event.stopPropagation();
    // }
  }

  trackByFn(index, item) {
    return item.id;
  }
  addClassBasedOnPointerValues() {
    this.renderer.addClass(
      this.el.nativeElement,
      `pointer-${this.pointerAlignment}`
    );
    this.renderer.addClass(this.el.nativeElement, this.alignment);
  }
  registerClickOnParent() {
    setTimeout(() => {
      this.renderer.listen(
        this.el.nativeElement.parentElement,
        'click',
        $event => {
          console.log('parent got clicked ????');
          this.togglePopoverState();
          this.cd.markForCheck();
        }
      );
    });
  }
  closePopoverViaInputControl() {
    this.renderer.removeClass(this.el.nativeElement, 'active');
    // console.log(
    //   'INACTIVE CLOSE',
    //   this.el.nativeElement.classList,
    //   this.el.nativeElement
    // );
    this.onClose.emit();
    this.closeEvent.emit();
  }

  togglePopoverState() {
    let hasActiveClass = this.el.nativeElement.classList.contains('active');
    if (hasActiveClass) {
      // this.el.nativeElement.classList.remove('active');
      this.renderer.removeClass(this.el.nativeElement, 'active');
      console.log(
        'INACTIVE',
        this.el.nativeElement.classList,
        this.el.nativeElement
      );
      this.onClose.emit();
      this.closeEvent.emit();
    } else {
      this.renderer.addClass(this.el.nativeElement, 'active');
      console.log(
        'ACTIVE',
        this.el.nativeElement.classList,
        this.el.nativeElement
      );
      // console.log('active');
      this.openEvent.emit();
    }
    this.cd.markForCheck();
  }

  injectComponentByCompId(componentId) {
    let compIndex = this.componentArr.findIndex(
      component => component.id === componentId
    );
    let compObj = this.componentArr[compIndex];
    let paramKeys = Object.keys(compObj.param);
    console.log(this.componentArr, compIndex, componentId);
    console.log(this.componentContainers, compObj);
    console.log('componentContainers', this.componentContainers);
    let compFactory = this.resolver.resolveComponentFactory(compObj.component);
    this.componentContainers.toArray()[compIndex].clear;
    let componentRef: ComponentRef<any> = this.componentContainers
      .toArray()
      [compIndex].createComponent(compFactory);
    paramKeys.forEach(key => {
      componentRef.instance[key] = compObj.param[key];
    });
  }

  injectComponent(idxes) {
    console.log(this.componentContainers.toArray());
    console.log(this.componentArr);
    console.log(idxes);
    idxes.forEach(idx => {
      let componentObjKeys = Object.keys(this.componentArr[idx])
        ? Object.keys(this.componentArr[idx])
        : [];
      let hasParams = componentObjKeys.indexOf('component') !== -1;
      let comp = hasParams
        ? this.componentArr[idx].component
        : this.componentArr[idx];
      let compFactory = this.resolver.resolveComponentFactory(comp);
      this.componentContainers.toArray()[idx].clear();
      let componentRef: ComponentRef<any> = this.componentContainers
        .toArray()
        [idx].createComponent(compFactory);

      if (hasParams && componentObjKeys.indexOf('param') !== -1) {
        let paramKeys = Object.keys(this.componentArr[idx].param);
        paramKeys.forEach(key => {
          componentRef.instance[key] = this.componentArr[idx].param[key];
        });
      }
      this.cd.markForCheck();
    });
  }

  createComponent() {}
}
