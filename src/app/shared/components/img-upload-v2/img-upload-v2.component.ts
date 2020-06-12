import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter, Input, forwardRef } from '@angular/core';
import { ProfilePicModel } from '../../models/profile-pic.model';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'edu-img-upload-v2',
  templateUrl: './img-upload-v2.component.html',
  styleUrls: ['./img-upload-v2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => ImgUploadV2Component) }
  ]
})
export class ImgUploadV2Component implements OnInit {
  imageSrc: string;
  acceptedFile: File
  mode = 'base64';
  constructor(private cdRef: ChangeDetectorRef) { }
  ngOnInit(): void {
  }
  writeValue(val: ProfilePicModel) {
    if (val === null) {
      return;
    }
    if (val.imageUrl) {
      this.mode = 'imageUrl';
      this.imageSrc = `https://education.development.allexis.io/admin/image/profile/${val.imageUrl}`;
      return;
    }
    this.imageSrc = val.base64;
    return;

  }
  registerOnChange(fn: any) {
    // this.onUpload = fn;
  }
  registerOnTouched() {

  }
  @Output() uploadimagedata = new EventEmitter<any>();
  @Input() activeColor = 'green';



  @Input() baseColor = '#E6E9F3';
  @Input() overlayColor = 'rgba(255,255,255,0.5)';

  dragging = false;
  loaded = false;
  imageLoaded = false;

  count = 140;

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
      return;
    }
    this.loaded = false;
    this.acceptedFile = file;
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    const reader = e.target;
    this.imageSrc = reader.result;
    this.loaded = true;
    this.cdRef.detectChanges();
    console.log(this.acceptedFile)
    this.uploadimagedata.emit({ base64: this.imageSrc, imageUrl: '', acceptedFile: this.acceptedFile });
  }

  increment() {
    this.count += 5;
  }

  decrement() {
    this.count -= 5;
  }

  deleteImg() {
    this.imageLoaded = false;
    this.loaded = false;
    this.imageSrc = '';
  }

  confirmImg() {
    this.loaded = false;
    this.uploadimagedata.emit({ base64: this.imageSrc, imageUrl: '', acceptedFile: this.acceptedFile });
  }

}
