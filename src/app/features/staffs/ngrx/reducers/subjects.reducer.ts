import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, Update } from '@ngrx/entity';
import { fetchSubjectSuccess, setSelectedState, unSetSelectedState } from '../actions';
import { SelectableSubjectModel } from 'src/app/shared/models/selectable-subject.model';
const subjectsAdapter = createEntityAdapter<SelectableSubjectModel>();
const initialState = subjectsAdapter.getInitialState();

export const subjectsReducer = createReducer(initialState,
  on(fetchSubjectSuccess, (state, action) => subjectsAdapter.addAll(action.subjects, state)),

  on(setSelectedState, (state, action) => {

    const stateShallowCopy = selectAll(state);
    const stateDeepCopy: SelectableSubjectModel[] = JSON.parse(JSON.stringify(stateShallowCopy));
    const resetedStateCopy = stateDeepCopy.map(item => ({ ...item, selected: false }));
    const updatedId = resetedStateCopy.findIndex(item => item.id === action.subjectId);

    resetedStateCopy[updatedId].selected = true;
    return subjectsAdapter.addAll(resetedStateCopy, state);
  }),

  on(unSetSelectedState, (state, action) => {

    const update: Update<SelectableSubjectModel> = {
      id: action.subjectId,
      changes: {
        selected: false
      }
    }

    return subjectsAdapter.updateOne(update, state)
  })
);
export const { selectAll } = subjectsAdapter.getSelectors()