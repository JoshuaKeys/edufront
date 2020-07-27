import { ConsoleSectionModel } from '../models/console-section.model';
import { ExtendedClassModel } from '../../subjects/models/extend-class.model';
import { StudentModel } from 'src/app/shared/models/student.model';
import { ConsoleAggregatedSectionData } from '../models/console-aggregated-section-data';
import { StaffModel } from 'src/app/shared/models/staff.model';
import { AggregatedResult } from '../models/aggregated-result.model';


export function aggregateSectionData(sections: ConsoleSectionModel[], classes: ExtendedClassModel[], students: StaffModel[]): AggregatedResult[] {
  const result: ConsoleAggregatedSectionData[] = sections.map(section => {
    const classItem = classes.find(classItem => classItem.id === section.classId)
    const studentsData: StaffModel[] = [];
    for (let i = 0; i < students.length; i++) {
      if (students[i].sectionId === section.id) {
        studentsData.push(students[i]);
      }
    }
    return {
      classItem,
      sectionName: section.sectionName,
      id: section.id,
      students: studentsData
    }
  });
  // console.log(result);
  let aggregatedResult: AggregatedResult[] = [];
  for (let i = 0; i < result.length; i++) {
    const classItem = result[i].classItem
    const sections = {
      id: result[i].id,
      sectionName: result[i].sectionName,
      students: result[i].students
    }
    const classItemIdx = aggregatedResult.findIndex(item => item.classItem.id === classItem.id);
    if (classItemIdx > -1) {
      aggregatedResult[classItemIdx].sections.push(sections);
    } else {
      aggregatedResult.push({
        classItem,
        sections: [sections]
      })
    }
  }
  return aggregatedResult;
}
