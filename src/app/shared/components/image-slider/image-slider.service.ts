import { Injectable, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ImageSliderService {
  constructor() {}
  newSlider = new Subject(); //<ElementRef>
  newPlaceholderImg = new Subject(); //<ElementRef>
}
