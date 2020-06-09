import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

function dataURLtoFile(dataurl, filename) {

  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

@Component({
  selector: 'edu-image-upload-v3',
  templateUrl: './image-upload-v3.component.html',
  styleUrls: ['./image-upload-v3.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageUploadV3Component implements OnInit {

  constructor() { }
  @Output() onImageCropped = new EventEmitter<File>();
  isLoaded: boolean;
  confirmed: boolean;
  ngOnInit(): void {
  }
  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    // event.
    this.croppedImage = event.base64;
    var file = dataURLtoFile('data:text/plain;base64,aGVsbG8gd29ybGQ=', 'image.png')
    this.onImageCropped.emit(file);
  }
  imageLoaded() {
    // show cropper
  }
  onConfirm() {
    this.confirmed = true;
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
}
