import { createReducer, on } from '@ngrx/store';
import { ClassesModel } from '../../models/classes-model';
import { SectionModel } from '../../models/section.model';
import { AggregateModel } from '../../models/aggregate.model';
import { setAggregatedResult } from '../actions/sections.actions';


const initialState: AggregateModel[] = [];
export const aggregateReducer = createReducer(initialState,
  on(setAggregatedResult, (state, action) => {
    console.log(action.result)
    return [
      ...state,
      ...action.result
    ]
  })
)
