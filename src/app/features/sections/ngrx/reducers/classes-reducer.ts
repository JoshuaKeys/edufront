import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, Update } from '@ngrx/entity';
import { ExtendedClassModel } from 'src/app/features/subjects/models/extend-class.model';
import {
  getAllClassesSuccess,
  toggleSelectedState,
  setClassStudents,
  toggleStudentsDraggedState,
  createStudentSuccess
} from '../actions/classes.actions';
import { removePreviouslySelectedState } from './utilities';
import { StaffModel } from 'src/app/shared/models/staff.model';

import {
  assignStudentsRandomly,
  setAllStudentDraggedState
} from '../actions/sections.actions';
import { ClassesModel } from 'src/app/shared/models/classes-model';

const classesAdapter = createEntityAdapter<ClassesModel>({
  selectId: classModel => {
    return classModel.class.id;
  }
});

export const classesInitialState = classesAdapter.getInitialState();
export const classesReducer = createReducer(
  classesInitialState,
  on(getAllClassesSuccess, (state, action) => {
    return classesAdapter.addAll(action.classes, state);
  }),
  on(toggleSelectedState, (state, action) => {
    const allClasses = selectAll(state);
    const allClassesCopy: ClassesModel[] = JSON.parse(
      JSON.stringify(allClasses)
    );
    const classIndex = allClassesCopy.findIndex(
      classItem => classItem.class.name === action.classGrade
    );
    allClassesCopy[classIndex].class.selected = !allClassesCopy[classIndex]
      .class.selected;
    const clearedClasses: Update<
      ClassesModel
    >[] = removePreviouslySelectedState(allClassesCopy, classIndex);
    return classesAdapter.updateMany(clearedClasses, state);
  }),
  on(setClassStudents, (state, action) => {
    return classesAdapter.updateOne(
      {
        id: action.classId,
        changes: {
          students: action.students
        }
      },
      state
    );
  }),
  on(setAllStudentDraggedState, (state, action) => {
    const allClassesCopy: ClassesModel[] = JSON.parse(
      JSON.stringify(selectAll(state))
    );
    const classToEdit = allClassesCopy.findIndex(
      classItem => classItem.class.id === action.classId
    );
    allClassesCopy[classToEdit].students = allClassesCopy[
      classToEdit
    ].students.map(student => {
      let dragged = action.state;

      return { ...student, dragged };
    });

    return classesAdapter.updateOne(
      {
        id: action.classId,
        changes: {
          students: allClassesCopy[classToEdit].students
        }
      },
      state
    );
  }),
  on(toggleStudentsDraggedState, (state, action) => {
    const allClassesCopy: ClassesModel[] = JSON.parse(
      JSON.stringify(selectAll(state))
    );
    const classToEdit = allClassesCopy.findIndex(
      classItem => classItem.class.id === action.student.classId
    );
    const studentToEdit = allClassesCopy[classToEdit].students.findIndex(
      student => student.id === action.student.id
    );
    allClassesCopy[classToEdit].students[
      studentToEdit
    ].dragged = !allClassesCopy[classToEdit].students[studentToEdit].dragged;
    return classesAdapter.updateOne(
      {
        id: action.student.classId,
        changes: {
          students: allClassesCopy[classToEdit].students
        }
      },
      state
    );
  }),
  on(assignStudentsRandomly, (state, action) => {
    const allClassesCopy: ClassesModel[] = JSON.parse(
      JSON.stringify(selectAll(state))
    );
    const classToEdit = allClassesCopy.findIndex(
      classItem => classItem.class.id === action.students[0].classId
    );
    const mappedClassesCopy = allClassesCopy[classToEdit].students.map(item => {
      item.dragged = true;
      return item;
    });
    return classesAdapter.updateOne(
      {
        id: action.students[0].classId,
        changes: {
          students: mappedClassesCopy
        }
      },
      state
    );
  }),
  on(createStudentSuccess, (state, action) => {
    const stateCopy = JSON.parse(JSON.stringify(state));
    const allStudents = selectAll(stateCopy);
    const specificStudentIdx = allStudents.findIndex(
      item => item.class.id === action.student.profileDto.classId
    );
    if (specificStudentIdx > -1) {
      allStudents[specificStudentIdx].students.push(action.student.profileDto);
    }

    return classesAdapter.updateOne(
      {
        id: allStudents[specificStudentIdx].class.id,
        changes: {
          students: allStudents[specificStudentIdx].students
        }
      },
      stateCopy
    );
  })
);

export const { selectAll } = classesAdapter.getSelectors();
