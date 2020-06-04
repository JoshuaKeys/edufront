import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { SectionsStateModel } from '../../models/sections-state.model';
import { toggleModal } from '../../ngrx/actions/sections-modal.actions';
import { Observable } from 'rxjs';
import { SectionsModalState } from '../../models/sections-modal-state.model';
import { selectModalState } from '../../ngrx/selectors';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'edu-create-sections',
  templateUrl: './create-sections.component.html',
  styleUrls: ['./create-sections.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateSectionsComponent implements OnInit {
  activatedRouteData = this.activatedRoute.snapshot.data
  sectionsModalState: Observable<SectionsModalState>;

  ngOnInit(): void {
    this.sectionsModalState = this.store.select(selectModalState)
  }
  onContinue() {
    this.store.dispatch(toggleModal({ modal: 'startModal' }))
  }
  constructor(private activatedRoute: ActivatedRoute, private store: Store<SectionsStateModel>) { }
}
