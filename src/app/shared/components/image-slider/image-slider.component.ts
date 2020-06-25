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
  ApplicationRef,
  HostListener
} from '@angular/core';
import { SliderChildrenDirective } from './slider-children.directive';
import { NgImageSliderComponent } from 'ng-image-slider';
import { ImageSliderService } from './image-slider.service';

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
    private sliderService: ImageSliderService
  ) {}
  @Input() imagePopup = false;
  @Input() infinite = false;
  @Input() animationSpeed = 0.3;
  @Input() imageSize = { width: '400px', height: '300px', space: 2 };
  afterViewInit = false;

  ngOnInit(): void {
    this.sliderService.newPlaceholderImg.subscribe(() => {
      this.imageObject.push(this.placeholderImageTemplate);
      this.cd.markForCheck();
    });
    this.sliderService.newSlider.subscribe((el: ElementRef) => {
      this.injectNgContent(this.indexInContainer, el);
      this.indexInContainer += 1;
    });
  }
  ngAfterViewInit() {
    this.injectBtnImg();
    // this.registerClickEvent();

    this.mainInnerEl = this.el.nativeElement.querySelector('.main-inner');
    this.mainEl = this.el.nativeElement.querySelector(
      '.ng-image-slider-container > .main'
    );

    //might have to redo this on resize
    this.hideBtns = this.mainEl.offsetWidth > this.mainInnerEl.offsetWidth;
    window.addEventListener('resize', () => {
      this.hideBtns = this.mainEl.offsetWidth > this.mainInnerEl.offsetWidth;
    });
  }

  indexInContainer = 0;
  mainEl;
  mainInnerEl;
  leftDisabled = true;
  rightDisabled = false;
  hideBtns = true;
  @ViewChild('nav') slider: NgImageSliderComponent;
  @ContentChildren(SliderChildrenDirective) ngContentEls;
  injectBtnImg() {
    let next_el = this.el.nativeElement.querySelector('.next.icons.next-icon');
    let prev_el = this.el.nativeElement.querySelector('.prev.icons.prev-icon');

    let newImgEl = this.renderer.createElement('img');
    let newImgEl2 = this.renderer.createElement('img');

    this.renderer.appendChild(next_el, newImgEl2);
    this.renderer.appendChild(prev_el, newImgEl);
  }

  populateImgObj(lengthOfObj) {
    this.imageObject = [];
    let tempImage = this.placeholderImageTemplate;
    for (let i = 0; i < lengthOfObj + 1; i++) {
      this.imageObject.push(this.placeholderImageTemplate);
    }
  }

  onArrowClickEvent() {
    setTimeout(() => {
      let marginLeftValue = this.mainInnerEl.style['margin-left'];
      this.leftDisabled = marginLeftValue == '0px';
      let marginLeftInt = Math.abs(parseInt(marginLeftValue.replace('px', '')));
      this.rightDisabled =
        marginLeftInt ===
        this.mainInnerEl.offsetWidth - this.mainEl.offsetWidth;

      console.log(this.mainEl.offsetWidth);
      console.log(Math.abs(parseInt(marginLeftValue.replace('px', ''))));
      console.log(this.mainInnerEl.offsetWidth - this.mainEl.offsetWidth);

      this.cd.markForCheck();
      console.log(marginLeftValue);
    });
  }
  injectNgContent(index, el: ElementRef) {
    let containers = this.el.nativeElement.querySelectorAll(
      '.main-inner .img-div'
    );

    this.renderer.appendChild(containers[index], el.nativeElement);
  }

  //default value that gets injected as placeholder
  placeholderImageTemplate = {
    image: 'assets/school-logox2.png1',
    thumbImage: 'assets/school-logox2.1png',
    alt: 'alt of image '
  };
  //this is needed for the slider to work, as it always display one less
  imageObject: Array<object> = [this.placeholderImageTemplate];
}
