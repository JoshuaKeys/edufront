import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { timetableReducer } from './reducer';
import { TimetableEffects } from './effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('timetable', timetableReducer),
    EffectsModule.forFeature([TimetableEffects])
  ],
  providers: [TimetableEffects]
})
export class TimetableStoreModule {}
