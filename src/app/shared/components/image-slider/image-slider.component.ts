import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  Renderer2,
  AfterViewInit,
  ContentChildren,
  ElementRef
} from '@angular/core';
import { SliderChildrenDirective } from './slider-children.directive';
import { NgImageSliderComponent } from 'ng-image-slider';

@Component({
  selector: 'edu-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageSliderComponent implements OnInit, AfterViewInit {
  constructor(private renderer: Renderer2, private el: ElementRef) {}
  @Input() imagePopup = false;
  @Input() infinite = false;
  @Input() animationSpeed = 0.3;

  ngOnInit(): void {}
  ngAfterViewInit() {
    this.injectBtnImg();
    console.log('ngContentEls');
    console.log(this.ngContentEls);
    this.injectNgContent();
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
  imageObject: Array<object> = [
    {
      image: 'assets/school-logox2.png1',
      thumbImage: 'assets/school-logox2.1png',
      alt: 'alt of image1'
      // title: 'title of image'
    },
    {
      image: 'assets/school-logox2.png1',
      thumbImage: 'assets/school-logox2.1png',
      alt: 'alt of images2'
      // title: 'title of image'
    },
    {
      image: 'assets/school-logox2.png1',
      thumbImage: 'assets/school-logox2.1png',
      alt: 'alt of image3'
      // title: 'title of image'
    },
    {
      image: 'assets/school-logox2.png1',
      thumbImage: 'assets/school-logox2.1png',
      alt: 'alt of image4'
      // title: 'title of image'
    },
    {
      image: 'assets/school-logox2.png1',
      thumbImage: 'assets/school-logox2.1png',
      alt: 'alt of image5'
      // title: 'title of image'
    },
    {
      image: 'assets/school-logox2.png1',
      thumbImage: 'assets/school-logox2.1png',
      alt: 'alt of image6'
      // title: 'title of image'
    },

    {
      image: 'assets/school-logox2.png1',
      thumbImage: 'assets/school-logox2.1png',
      alt: 'alt of image7'
      // title: 'title of image'
    }
  ];
}
