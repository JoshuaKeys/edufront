import { createReducer, on } from '@ngrx/store';
import { AggregateModel } from '../../models/aggregate.model';
import { setAggregatedResult } from '../actions/sections.actions';


const initialState: AggregateModel[] = [];
export const aggregateReducer = createReducer(initialState,
  on(setAggregatedResult, (state, action) => {
    return [
      ...action.result
    ]
  })
)
