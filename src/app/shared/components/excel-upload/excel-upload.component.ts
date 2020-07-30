import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  HostListener,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
@Component({
  selector: 'edu-excel-upload',
  templateUrl: './excel-upload.component.html',
  styleUrls: ['./excel-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExcelUploadComponent implements OnInit {
  // import { StudentsService } from '../../services/students.service';
  fileToUpload: File = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  @ViewChild('fileInput') fileInput: ElementRef;
  @Output('edu-change') onChangeEvent: EventEmitter<File> = new EventEmitter();
  elementState: 'active' | 'inactive' | 'click' = 'inactive';
  uploadSpreadSheet(file: File): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': '' })
    };
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>('/api/v1/profiles', formData);
  }
  public onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const excelFile: File = event.target.files[0];
      this.onChangeEvent.emit(excelFile);
      this.fileInput.nativeElement.value = '';
      // this.uploadSpreadSheet(excelFile).subscribe(
      //   data => {
      //   },
      //   err => {
      //   }
      // );
    }
  }

  preventDefaultsAndStopBubble(event: any) {
    event.stopPropagation();
    event.preventDefault();
  }
  @HostListener('dragenter', ['$event']) onDragEnter($event) {
    this.preventDefaultsAndStopBubble($event);
  }
  @HostListener('dragleave', ['$event']) onDragLeave($event) {
    this.preventDefaultsAndStopBubble($event);
    this.elementState = 'inactive';
  }
  @HostListener('mouseenter', ['$event']) onmouseenter($event) {
    this.preventDefaultsAndStopBubble($event);
    this.elementState = 'active';
  }
  @HostListener('mouseleave', ['$event']) onmouseleave($event) {
    this.preventDefaultsAndStopBubble($event);
    this.elementState = 'inactive';
  }
  @HostListener('dragover', ['$event']) onDragOver($event) {
    this.preventDefaultsAndStopBubble($event);
    this.elementState = 'active';
  }
  @HostListener('drag', ['$event']) onDrag($event) {
    this.preventDefaultsAndStopBubble($event);
  }
  @HostListener('drop', ['$event']) onDrop($event) {
    this.preventDefaultsAndStopBubble($event);
    let dt = $event.dataTransfer;
    let files = dt.files;
    this.onChangeEvent.emit(files[0]);
    this.elementState = 'inactive';
  }
}

// <!-- dropArea.addEventListener('dragenter', handlerFunction, false)
// dropArea.addEventListener('dragleave', handlerFunction, false)
// dropArea.addEventListener('dragover', handlerFunction, false)
// dropArea.addEventListener('drop', handlerFunction, false) -->
