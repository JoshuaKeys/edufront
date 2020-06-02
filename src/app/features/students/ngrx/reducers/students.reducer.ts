import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter } from '@ngrx/entity';
import { StudentModel } from '../../models/student.model';
import { fetchedStudentsSuccess, createStudentSuccess, deleteStudentSuccess } from '../actions/class-students.actions';
import { ProfileDTOModel } from '../../models/profile-dto.model';

const studentsAdapter = createEntityAdapter<StudentModel>({
  selectId: (student: StudentModel) => student.profileDto.id,
})
const initialState = studentsAdapter.getInitialState();
export const studentsReducer = createReducer(initialState,
  on(fetchedStudentsSuccess, (state, action) => {
    return studentsAdapter.addAll(action.students, state);
  }),
  on(createStudentSuccess, (state, action) => {
    return studentsAdapter.addOne(action.student, state);
  }),
  on(deleteStudentSuccess, (state, action) => {
    return studentsAdapter.removeOne(action.student.profileDto.id, state);
  })
);

export const { selectAll } = studentsAdapter.getSelectors();
