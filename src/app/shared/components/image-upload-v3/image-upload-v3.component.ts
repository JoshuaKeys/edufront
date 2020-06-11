import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  ViewChild,
  forwardRef,
  Input,
  Renderer2,
  ElementRef
} from '@angular/core';
import { ProfilePicModel } from 'src/app/shared/models/profile-pic.model';
import { UtilsService } from 'src/app/shared/services/utils.service';
import {
  ImageCroppedEvent,
  ImageTransform,
  ImageCropperComponent
} from 'ngx-image-cropper';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export function dataURLtoFile(dataurl, filename) {
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ImageUploadV3Component)
    }
  ]
})
export class ImageUploadV3Component implements OnInit, ControlValueAccessor {
  constructor(
    private utils: UtilsService,
    private cd: ChangeDetectorRef,
    private renderer: Renderer2,
    private el: ElementRef
  ) { }
  @Input('showControls') showControls = true;
  @Output() onImageCropped = new EventEmitter<File>();
  @Output('confirm') onConfirmEvent = new EventEmitter<ProfilePicModel>();
  @ViewChild(ImageCropperComponent) ImageCropper: ImageCropperComponent;
  @ViewChild('file') file: ElementRef;
  dragging;
  isLoaded: boolean;
  confirmed: boolean;
  isMousedOver = false;
  ngOnInit(): void {
    this.setHostToCircle(true);
  }

  // b64; // is value rendered by output Image
  value: ProfilePicModel = { base64: '', acceptedFile: null, imageUrl: '' }; //
  croppedImage; //isValue of cropped image at any time
  imageChangedEvent: any = '';

  scale = 1;
  imgUploaded = false;

  imageTransFormObj: ImageTransform = {
    scale: 1,
    rotate: 0,
    flipH: false,
    flipV: false
  };

  handleDrop(e) {
    //work in progress
    e.preventDefault();
    this.dragging = false;
    const file = e.dataTransfer ? e.dataTransfer.files : e.target.files;
  }

  handleDragEnter() {
    this.dragging = true;
  }

  handleDragLeave() {
    this.dragging = false;
  }

  onMouseEnter() {
    this.isMousedOver = true;
  }
  onMouseLeave() {
    this.isMousedOver = false;
  }

  showPlaceHolderImage() {
    return !this.imgUploaded || this.confirmed;
  }

  setHostToCircle(setToCircle) {
    if (setToCircle) {
      this.renderer.addClass(this.el.nativeElement, 'circle');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'circle');
    }
  }

  resetCropper() {
    this.imageChangedEvent = null;
    this.imgUploaded = false;
    this.croppedImage = '';
    this.setHostToCircle(true);
    this.isMousedOver = false;
  }
  zoomIn() {
    this.imageTransFormObj.scale += 0.1;
    this.imageTransFormObj = { ...this.imageTransFormObj };
  }
  zoomOut() {
    this.imageTransFormObj.scale -= 0.1;
    if (this.imageTransFormObj.scale < 0) {
      this.imageTransFormObj.scale = 0.1;
    }
    this.imageTransFormObj = { ...this.imageTransFormObj };
  }
  fileChangeEvent(event: any): void {
    this.setHostToCircle(false);
    this.imageChangedEvent = event;
    this.imgUploaded = true;
    this.confirmed = false;
  }
  imageCropped(event: ImageCroppedEvent) {
    //come back to fix the blob image output
    this.croppedImage = event.base64;
    // console.log(this.croppedImage);

    //was here originally
    var file = dataURLtoFile(
      'data:text/plain;base64,aGVsbG8gd29ybGQ=',
      'image.png'
    );
    this.onImageCropped.emit(file);
  }
  imageLoaded() {
    // show cropper
  }

  onConfirm() {
    //work in progress to customize starting cropping position

    let width = this.ImageCropper.sourceImage.nativeElement.offsetWidth;
    let height = this.ImageCropper.sourceImage.nativeElement.offsetHeight;

    // console.log(typeof this.croppedImage);
    // this.value = new Blob([this.croppedImage], { type: 'image/png' });
    let blob: any = this.utils.getBlob(this.croppedImage);

    blob.lastModifiedDate = new Date();
    blob.name = 'imageFile';

    this.value.base64 = this.croppedImage;
    this.value.acceptedFile = dataURLtoFile(this.croppedImage, 'imageFile');
    // console.log(this.value);
    // this.value = { ...this.value };
    this.onChange(this.value);
    this.onTouched();

    this.onConfirmEvent.emit(this.value);

    // console.log(this.value);

    this.confirmed = true;
    this.isMousedOver = false;
    this.cd.markForCheck();
    this.setHostToCircle(true);
  }

  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  //Control value accessor implementation
  onChange: any = () => { };
  onTouched: any = () => { };
  writeValue(val: any) {
    // console.log('called');
    if (val === null) {
      return;
    }

    this.value.base64 = val.base64;
  }
  registerOnChange(fn: any) {
    this.onChange = fn;
    // this.onUpload = fn;
  }
  registerOnTouched() { }

  // disabled = false;
  // onChange: any = () => {};
  // onTouched: any = () => {};

  // writeValue(value: any) {
  //   this.value = value;
  // }

  // registerOnChange(fn: any) {
  //   this.onChange = fn;
  // }

  // registerOnTouched(fn: any) {
  //   this.onTouched = fn;
  // }
  // setDisabledState(isDisabled: boolean): void {
  //   this.disabled = isDisabled;
  // }
}
