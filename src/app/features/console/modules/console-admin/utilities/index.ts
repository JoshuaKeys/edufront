import { ConsoleSectionModel } from '../models/console-section.model';

import { StudentModel } from 'src/app/shared/models/student.model';
import { ConsoleAggregatedSectionData } from '../models/console-aggregated-section-data';
import { StaffModel } from 'src/app/shared/models/staff.model';
import { AggregatedResult } from '../models/aggregated-result.model';
import { ExtendedClassModel } from 'src/app/features/subjects/models/extend-class.model';


// export function aggregateSectionData(sections: ConsoleSectionModel[], classes: ExtendedClassModel[], students: StaffModel[], studentsByClass: StaffModel[]): AggregatedResult[] {
//   console.log(arguments)
//   const result: ConsoleAggregatedSectionData[] = sections.map(section => {
//     const classItem = classes.find(classItem => classItem.id === section.classId)
//     const studentsData: StaffModel[] = [];
//     for (let i = 0; i < students.length; i++) {
//       if (students[i]['sectionId'] === section.id) {
//         studentsData.push(students[i]);
//       }
//     }
//     return {
//       classItem,
//       sectionName: section.sectionName,
//       id: section.id,
//       students: studentsData
//     }
//   });
//   let aggregatedResult: AggregatedResult[] = [];
//   for (let i = 0; i < result.length; i++) {
//     const classItem = result[i].classItem
//     const sections = {
//       id: result[i].id,
//       sectionName: result[i].sectionName,
//       students: result[i].students
//     }
//     const classItemIdx = aggregatedResult.findIndex(item => item.classItem.id === classItem.id);
//     if (classItemIdx > -1) {
//       aggregatedResult[classItemIdx].sections.push(sections);
//     } else {
//       aggregatedResult.push({
//         classItem,
//         sections: [sections]
//       })
//     }
//   }
//   return aggregatedResult;
// }
export function aggregateSectionData(sections: ConsoleSectionModel[], classes: ExtendedClassModel[], students: StaffModel[]): AggregatedResult[] {
  const result: AggregatedResult[] = []
  for (let i = 0; i < classes.length; i++) {
    const sectionsArr = [];
    const sectionsCopy: ConsoleSectionModel[] = JSON.parse(JSON.stringify(sections));
    for (let j = 0; j < sectionsCopy.length; j++) {
      if (sectionsCopy[j].classId === classes[i].id) {
        console.log('holla')
        const studentsData: StaffModel[] = [];
        for (let k = 0; k < students.length; k++) {
          if (students[k]['sectionId'] === sectionsCopy[j].id) {
            studentsData.push(students[k]);
          }
        }
        sectionsCopy[j]['students'] = studentsData;
        sectionsArr.push(sectionsCopy[j]);
      }
    }
    const studentsArr = [];
    for (let j = 0; j < students.length; j++) {
      if (students[j].classId === classes[i].id) {
        studentsArr.push(students[j])
      }
    }
    result.push({
      classItem: classes[i],
      sections: sectionsArr,
      students: studentsArr
    })
  }
  return result;
}
