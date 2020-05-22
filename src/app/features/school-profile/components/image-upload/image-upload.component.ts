import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'edu-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageUploadComponent {
  @Output() uploadimagedata = new EventEmitter<any>();
  @Input() activeColor = 'green';



  @Input() baseColor = '#E6E9F3';
  @Input() overlayColor = 'rgba(255,255,255,0.5)';

  dragging = false;
  loaded = false;
  imageLoaded = false;
  imageSrc = '';


  count = 180;

  handleDragEnter() {
    this.dragging = true;
  }

  handleDragLeave() {
    this.dragging = false;
  }

  handleDrop(e) {
    e.preventDefault();
    this.dragging = false;
    this.handleInputChange(e);
  }

  handleImageLoad() {
    this.imageLoaded = true;
  }

  handleInputChange(e) {
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    const pattern = /image-*/;
    const reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }

    this.loaded = false;

    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);

  }

  _handleReaderLoaded(e) {
    const reader = e.target;
    this.imageSrc = reader.result;
    this.uploadimagedata.emit({ base64: reader.result, imageUrl: '' });
    this.loaded = true;
  }

  increment() {
    this.count += 5;
    // return this.count = 210;
  }

  decrement() {
    this.count -= 5;
    // return this.count = 150;
  }

  deleteImg() {
    this.imageLoaded = false;
    this.loaded = false;
    this.imageSrc = '';
  }

  confirmImg() {
    this.loaded = false;
  }

}
