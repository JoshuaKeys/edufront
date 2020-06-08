import { createReducer, on } from '@ngrx/store';
import { SectionModel } from '../../models/section.model';
import { initFirstSection, addStudentToSection, removeStudentFromSection, addNewSection, assignStudentsRandomly } from '../actions/sections.actions';
import { StudentModel } from 'src/app/shared/models/student.model';

const initialState: SectionModel[] = [];

export const sectionsReducer = createReducer(initialState,
  on(initFirstSection, (state, action) => {
    const stateCopy: SectionModel[] = JSON.parse(JSON.stringify(state));
    const sectionIsPresent = stateCopy.findIndex(section => action.classId === section.classId);
    if (sectionIsPresent === -1) {
      stateCopy.push({
        classId: action.classId,
        sections: [{ sectionName: '1', subjects: [] }]
      })
      return stateCopy;
    }
    return state;
  }),
  // on(),
  on(addStudentToSection, (state, action) => {
    const stateCopy: SectionModel[] = JSON.parse(JSON.stringify(state));
    const sectionIndex = stateCopy.findIndex(section => section.classId === action.classId);

    const sectionNameIndex = stateCopy[sectionIndex].sections.findIndex(
      sessionName => sessionName.sectionName === action.sectionName
    )
    stateCopy[sectionIndex].sections[sectionNameIndex].subjects.push(action.student)
    return stateCopy;
  }),
  on(removeStudentFromSection, (state, action) => {
    const stateCopy: SectionModel[] = JSON.parse(JSON.stringify(state));
    const sectionIndex = stateCopy.findIndex(section => section.classId === action.classId);
    const sectionNameIndex = stateCopy[sectionIndex].sections.findIndex(
      sessionName => sessionName.sectionName === action.sectionName
    )
    const studentIdx = stateCopy[sectionIndex].sections[sectionNameIndex].subjects.findIndex(sub => sub.id === action.student.id)
    stateCopy[sectionIndex].sections[sectionNameIndex].subjects.splice(studentIdx, 1)
    return stateCopy;
  }),
  on(addNewSection, (state, action) => {
    const stateCopy: SectionModel[] = JSON.parse(JSON.stringify(state));
    // get section by id

    const sectionId = stateCopy.findIndex(section => section.classId === action.classId);
    // get last section
    const sectionLength = stateCopy[sectionId].sections.length;

    stateCopy[sectionId].sections.push({ sectionName: (sectionLength + 1).toString(), subjects: [] })

    return stateCopy;
  }),
  on(assignStudentsRandomly, (state, action) => {
    const stateCopy: SectionModel[] = JSON.parse(JSON.stringify(state));
    if (!stateCopy[0].classId) {
      return stateCopy;
    }
    // const studentsAmount = 1
    // console.log('hahahahaha', stateCopy);
    const sectionIndex = stateCopy.findIndex(section => section.classId === action.classId);
    const sections = stateCopy[sectionIndex].sections;
    const sectionsLength = sections.length;
    for (let i = 0; i < action.students.length; i++) {
      const randomLocation = Math.floor(Math.random() * (sectionsLength))
      sections[randomLocation].subjects.push(action.students[i])
    }
    return stateCopy;
  })
);

