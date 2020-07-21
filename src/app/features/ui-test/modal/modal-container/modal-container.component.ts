import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ElementRef,
  Renderer2,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
  AfterViewInit,
  ComponentRef,
  ChangeDetectorRef
} from '@angular/core';
import { ModalService } from '../modal.service';
import { skip } from 'rxjs/operators';

@Component({
  selector: 'edu-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalContainerComponent implements OnInit, AfterViewInit {
  constructor(
    private modalService: ModalService,
    private render: Renderer2,
    private el: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.modalService.activeComponentInModal
      // .pipe(skip(1))
      .subscribe(({ component, param, output }) => {
        console.log('MODAL SERVICE SUB - ', component);
        if (component === null) {
          this.clearModal();
        } else {
          this.loadComponent(component, param, output);
        }
      });
  }
  @ViewChild('modalContainer', { read: ViewContainerRef })
  modalContainer: ViewContainerRef;

  clearModal() {
    this.modalContainer.clear();
    this.render.removeClass(this.el.nativeElement, 'active');
    this.modalService.activeComponentEventStream.next({
      event: 'modal-deleted'
    });
    this.modalService.resetActiveComponentEventStream();
  }

  loadComponent(injectedComponent, params, output = []) {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      injectedComponent
    );
    this.render.addClass(this.el.nativeElement, 'active');
    this.modalContainer.clear();
    let componentRef: ComponentRef<any> = this.modalContainer.createComponent(
      componentFactory
    );
    this.modalService.activeComponentEventStream.next({
      event: 'modal-created'
    });
    console.log('param', params, componentRef);

    Object.keys(params).forEach(key => {
      componentRef.instance[key] = params[key];
    });

    componentRef.instance['testEvent'].subscribe(value => {
      this.modalService.activeComponentEventStream.next({
        event: 'testEvent',
        value
      });
      console.log('testEvent', value);
    });

    // output.forEach(eventName => {
    //   console.log('output', eventName);
    //   componentRef.instance[eventName].subscribe(value => {
    //     this.modalService.activeComponentEventStream.next({
    //       event: eventName,
    //       value
    //     });
    //     console.log(eventName, value);
    //   });
    // });

    this.cd.markForCheck();
  }
}
