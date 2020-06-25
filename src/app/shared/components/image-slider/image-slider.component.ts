import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  Renderer2,
  AfterViewInit,
  ContentChildren,
  ElementRef,
  ChangeDetectorRef,
  ApplicationRef
} from '@angular/core';
import { SliderChildrenDirective } from './slider-children.directive';
import { NgImageSliderComponent } from 'ng-image-slider';
import { toggleClassInSubject } from 'src/app/features/staffs/ngrx/actions';

@Component({
  selector: 'edu-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageSliderComponent implements OnInit, AfterViewInit {
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private cd: ChangeDetectorRef,
    private appRef: ApplicationRef
  ) {}
  @Input() imagePopup = false;
  @Input() infinite = false;
  @Input() animationSpeed = 0.3;
  afterViewInit = false;
  ngOnInit(): void {}
  ngAfterViewInit() {
    this.ngContentEls.forEach((element: SliderChildrenDirective) => {
      element.onInit.subscribe(() => {
        console.log('child created');
      });
    });
    // if (!this.afterViewInit) {
    // this.populateImgObj(this.ngContentEls.length);
    // console.log('ngContentEls' + this.ngContentEls.length);
    // console.log(this.ngContentEls);
    // console.log(this.imageObject);
    // this.cd.markForCheck();
    // this.appRef.tick();
    // this.afterViewInit = true;
    // setTimeout(() => {
    // this.injectBtnImg();
    // this.injectNgContent();
    // }, 100);

    // }
  }
  imageSize = { width: '400px', height: '300px', space: 2 };
  @ViewChild('nav') slider: NgImageSliderComponent;
  @ContentChildren(SliderChildrenDirective) ngContentEls;
  injectBtnImg() {
    let next_el = this.el.nativeElement.querySelector('.next.icons.next-icon');
    let prev_el = this.el.nativeElement.querySelector('.prev.icons.prev-icon');

    console.log(next_el.childNodes[0]);

    let newImgEl = this.renderer.createElement('img');
    let newImgEl2 = this.renderer.createElement('img');

    this.renderer.appendChild(next_el, newImgEl2);
    this.renderer.appendChild(prev_el, newImgEl);

    console.log(next_el);
    console.log(next_el.childNodes[0]);
  }

  populateImgObj(lengthOfObj) {
    this.imageObject = [];
    let tempImage = this.placeholderImageTemplate;
    for (let i = 0; i < lengthOfObj + 1; i++) {
      this.imageObject.push(this.placeholderImageTemplate);
    }
  }
  onArrowClickEvent(event) {
    console.log(event);
    let containers = this.el.nativeElement.querySelectorAll(
      '.main-inner .img-div'
    );
    // this.injectNgContent();
    console.log(containers);
  }
  injectNgContent() {
    let containers = this.el.nativeElement.querySelectorAll(
      '.main-inner .img-div'
    );
    this.ngContentEls.forEach((el, index) => {
      console.log('injecting - ' + index);
      // console.log(el);1
      this.renderer.appendChild(containers[index], el.el.nativeElement);
    });
    let firstEl = this.ngContentEls.first.el.nativeElement.cloneNode(true);
    console.log(this.ngContentEls);
    console.log(containers);
    // this.renderer.
  }
  placeholderImageTemplate = {
    image: 'assets/school-logox2.png1',
    thumbImage: 'assets/school-logox2.1png',
    alt: 'alt of image '
  };
  imageObject: Array<object> = [this.placeholderImageTemplate];
}
