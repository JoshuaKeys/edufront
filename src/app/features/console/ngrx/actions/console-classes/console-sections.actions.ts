import { createAction, props } from '@ngrx/store';
import { ConsoleAggregatedSectionData } from '../../../models/console-aggregated-section-data';
import { ConsoleSectionModel } from '../../../models/console-section.model';
import { ExtendedClassModel } from 'src/app/features/subjects/models/extend-class.model';
import { AggregatedResult } from '../../../models/aggregated-result.model';

export const fetchSectionData = createAction(
  '[ConsoleSectionsComponent] fetchSectionData',
)
export const fetchSectionDataSuccess = createAction(
  '[ConsoleSectionsEffect] fetchSectionDataSuccess',
  props<{ sections: AggregatedResult[] }>()
)
export const aggregateSectionDataRequest = createAction(
  '[ConsoleSectionsEffect] aggregateSectionDataRequest',
  props<{ sections: ConsoleSectionModel[], classes: ExtendedClassModel[] }>()
)
