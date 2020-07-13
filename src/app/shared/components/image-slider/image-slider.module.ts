import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgImageSliderModule } from 'ng-image-slider';
import { ImageSliderComponent } from './image-slider.component';
import { SliderChildrenDirective } from './slider-children.directive';

@NgModule({
  declarations: [ImageSliderComponent, SliderChildrenDirective],
  imports: [CommonModule, NgImageSliderModule],
  exports: [ImageSliderComponent, SliderChildrenDirective]
})
export class ImageSliderModule {}
