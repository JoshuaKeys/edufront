import { Component, OnInit, Input, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'edu-img-upload',
  templateUrl: './img-upload.component.html',
  styleUrls: ['./img-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImgUploadComponent implements OnInit {

  constructor(private cd :ChangeDetectorRef, private el:ElementRef) { }

  ngOnInit(): void {
    this.setElementID();
  }
  dragging;
  message;
  imagePath;
  imgURL = null;
  @Input("elementId") elementId:string = "temp123"

  previewImg(files){
 
      if (files.length === 0)
        return;
   
      var mimeType = files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return;
      }
   
      var reader = new FileReader();
      this.imagePath = files;
      reader.readAsDataURL(files[0]); 
      reader.onload = (_event) => { 
        // console.log(reader.result)
        this.imgURL = reader.result; 
        this.cd.markForCheck();
      }
    
  }

  handleDragEnter() {
    this.dragging = true;
  }

  handleDragLeave() {
    this.dragging = false;
  }

  handleDrop(e) {
    e.preventDefault();
    this.dragging = false;
    const file = e.dataTransfer ? e.dataTransfer.files : e.target.files;
    this.previewImg(file);
  }

  deleteImg(){
    this.imgURL = null
  }

  setElementID(){
    if(this.elementId == undefined && this.el.nativeElement.getAttribute("formcontrolname") !== undefined){
      this.elementId = this.el.nativeElement.getAttribute("formcontrolname");
    } 

  }
}
