import { Component, OnInit, ChangeDetectionStrategy, forwardRef, EventEmitter, Output, Input, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'edu-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => ImageUploadComponent) }
  ]
})
export class ImageUploadComponent implements OnInit, ControlValueAccessor {
  imageSrc: string;
  acceptedFile: File
  constructor(private cdRef: ChangeDetectorRef) { }
  onUpload: (src: string) => any;
  ngOnInit(): void {
  }
  writeValue(val: any) {
    console.log('called')
    if (val === null) {
      return;
    }

    this.imageSrc = val.base64;
  }
  registerOnChange(fn: any) {
    this.onUpload = fn;
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
    this.acceptedFile = file;
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
    console.log(reader);
  }

  _handleReaderLoaded(e) {
    const reader = e.target;
    this.imageSrc = reader.result;
    this.loaded = true;
    this.cdRef.detectChanges();
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
