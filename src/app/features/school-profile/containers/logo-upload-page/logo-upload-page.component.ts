import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SchoolProfileService } from '../../school-profile.service';
import { State } from '../../ngrx/state';
import { Store } from '@ngrx/store';
import { uploadSchoolLogo } from '../../ngrx/actions';

@Component({
  selector: 'edu-logo-upload-page',
  templateUrl: './logo-upload-page.component.html',
  styleUrls: ['./logo-upload-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoUploadPageComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  file: File = null;
  previewUrl:any = null;
  navBlock: object;
  constructor(private route: ActivatedRoute,
              private cdRef: ChangeDetectorRef,
              private spf: SchoolProfileService,
              public store: Store<State>,
              private router: Router) { }

  ngOnInit(): void {
    this.subscription.add(this.route.data.subscribe(res => {
      this.navBlock = res;
    }));
  }

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    console.log('Ev', $event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(fileInput) {
    if (fileInput && fileInput[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(fileInput[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.cdRef.markForCheck();
        this.previewUrl = reader.result;
        this.file = fileInput[0];
        this.spf.postImage(fileInput[0]).subscribe(x => console.log('POST',x));
        // uploadSchoolLogo
        // this.store.dispatch(uploadSchoolLogo({value: fileInput[0]}));
      }
    }
    console.log('Fil', fileInput[0]);
  }

  deleteFile() {
    this.file = null;
    this.previewUrl = null;
  }

  onNext() {
    this.router.navigate([`../${this.navBlock['next']}`], {relativeTo: this.route});
  }

  onPrevious() {
    this.router.navigate([`../${this.navBlock['previous']}`], {relativeTo: this.route});
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
