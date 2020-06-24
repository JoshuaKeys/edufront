import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewChild
} from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';

@Component({
  selector: 'edu-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageSliderComponent implements OnInit {
  constructor() {}
  @Input() imagePopup = false;
  @Input() infinite = true;
  @Input() animationSpeed = 0.6;
  ngOnInit(): void {}
  imageSize = { width: '400px', height: '300px', space: 1 };
  @ViewChild('nav') slider: NgImageSliderComponent;

  prevImageClick() {
    this.slider.prev();
  }

  nextImageClick() {
    this.slider.next();
  }
  imageObject: Array<object> = [
    {
      image: 'assets/school-logox2.png',
      thumbImage: 'assets/school-logox2.png',
      alt: 'alt of image'
      // title: 'title of image'
    },
    {
      image: 'assets/school-logox2.png', // Support base64 image
      thumbImage: 'assets/school-logox2.png', // Support base64 image
      // title: 'Image title', //Optional: You can use this key if want to show image with title
      alt: 'Image alt' //Optional: You can use this key if want to show image with alt
    },
    {
      image: 'assets/school-logox2.png', // Support base64 image
      thumbImage: 'assets/school-logox2.png', // Support base64 image
      // title: 'Image title', //Optional: You can use this key if want to show image with title
      alt: 'Image alt' //Optional: You can use this key if want to show image with alt
    },
    {
      image: 'assets/school-logox2.png', // Support base64 image
      thumbImage: 'assets/school-logox2.png', // Support base64 image
      // title: 'Image title', //Optional: You can use this key if want to show image with title
      alt: 'Image alt' //Optional: You can use this key if want to show image with alt
    },
    {
      image: 'assets/school-logox2.png', // Support base64 image
      thumbImage: 'assets/school-logox2.png', // Support base64 image
      // title: 'Image title', //Optional: You can use this key if want to show image with title
      alt: 'Image alt' //Optional: You can use this key if want to show image with alt
    },
    {
      image: 'assets/school-logox2.png', // Support base64 image
      thumbImage: 'assets/school-logox2.png', // Support base64 image
      // title: 'Image title', //Optional: You can use this key if want to show image with title
      alt: 'Image alt' //Optional: You can use this key if want to show image with alt
    },
    {
      image: 'assets/school-logox2.png', // Support base64 image
      thumbImage: 'assets/school-logox2.png', // Support base64 image
      // title: 'Image title', //Optional: You can use this key if want to show image with title
      alt: 'Image alt' //Optional: You can use this key if want to show image with alt
    },
    {
      image: 'assets/school-logox2.png', // Support base64 image
      thumbImage: 'assets/school-logox2.png', // Support base64 image
      // title: 'Image title', //Optional: You can use this key if want to show image with title
      alt: 'Image alt' //Optional: You can use this key if want to show image with alt
    },
    {
      image: 'assets/school-logox2.png', // Support base64 image
      thumbImage: 'assets/school-logox2.png', // Support base64 image
      // title: 'Image title', //Optional: You can use this key if want to show image with title
      alt: 'Image alt' //Optional: You can use this key if want to show image with alt
    }
  ];
}
