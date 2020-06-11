import { createReducer, on } from '@ngrx/store';
import { SectionModel } from '../../models/section.model';
import { initFirstSection, addStudentToSection, removeStudentFromSection, addNewSection, assignStudentsRandomly, changeSectionNameRequest } from '../actions/sections.actions';
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
  on(changeSectionNameRequest, (state, action) => {
    const stateCopy: SectionModel[] = JSON.parse(JSON.stringify(state));

    const classIdx = stateCopy.findIndex(section => section.classId === action.classId);
    const sectionIdx = stateCopy[classIdx].sections.findIndex(section => section.sectionName === action.sectionName);
    stateCopy[classIdx].sections[sectionIdx].sectionName = action.sectionNewName;
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
    let currentIndex = 0;

    for (let i = 0; i < action.students.length; i++) {
      if (currentIndex < sectionsLength) {
        sections[currentIndex].subjects.push(action.students[i]);
        currentIndex++;
      } else {
        currentIndex = 0;
        sections[currentIndex].subjects.push(action.students[i]);
        currentIndex++;
      }
    }
    return stateCopy;
  })
);

