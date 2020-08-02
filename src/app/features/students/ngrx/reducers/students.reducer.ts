import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter } from '@ngrx/entity';
import { StudentModel } from '../../../../shared/models/student.model';
import {
  fetchedStudentsSuccess,
  createStudentSuccess,
  deleteStudentSuccess,
  editStudentResponse,
  refreshStudentXClass
} from '../actions/class-students.actions';
import { ProfileDTOModel } from '../../../../shared/models/profile-dto.model';

const studentsAdapter = createEntityAdapter<StudentModel>({
  selectId: (student: StudentModel) => student.profileDto.id
});
const initialState = studentsAdapter.getInitialState();
export const studentsReducer = createReducer(
  initialState,
  on(fetchedStudentsSuccess, (state, action) => {
    return studentsAdapter.addAll(action.students, state);
  }),
  on(createStudentSuccess, (state, action) => {
    return studentsAdapter.addOne(action.student, state);
  }),
  on(deleteStudentSuccess, (state, action) => {
    return studentsAdapter.removeOne(action.student.profileDto.id, state);
  }),
  on(editStudentResponse, (state, action) => {
    return studentsAdapter.updateOne(
      {
        id: action.student.profileDto.id,
        changes: {
          profileDto: {
            ...action.student.profileDto
          }
        }
      },
      state
    );
  }),

  on(refreshStudentXClass, (state, action) => {
    //TBD can delete later i think
    console.log('refreshStudentXClass');
    return JSON.parse(JSON.stringify(state));
  })
);

export const { selectAll } = studentsAdapter.getSelectors();
