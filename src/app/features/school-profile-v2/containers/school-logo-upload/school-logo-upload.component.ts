import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'edu-school-logo-upload',
  templateUrl: './school-logo-upload.component.html',
  styleUrls: ['./school-logo-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchoolLogoUploadComponent implements OnInit {
  activatedRouteData = this.activatedRoute.snapshot.data;
  uploadForm: FormGroup;

  ngOnInit(): void {
    this.uploadForm = new FormGroup({
      image: new FormControl(null)
    })
  }
  constructor(private activatedRoute: ActivatedRoute) { }
}
