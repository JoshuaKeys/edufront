import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor() {}

  getBlob(blobString: string, type = 'image/png') {
    return new Blob([blobString], { type });
  }

  autoAssignToSections(
    sections: {
      sectionName: string;
      sectionIdx: number;
      subjects?: any[];
    }[],
    subjects: { gender: string }[]
  ) {
    let results = JSON.parse(JSON.stringify(sections));

    let maleSubjects = [];
    let femaleSubjects = [];

    subjects.forEach(subject => {
      let _subject = JSON.parse(JSON.stringify(subject));
      if (subject.gender.toLowerCase().trim() == 'male') {
        maleSubjects.push(_subject);
      } else {
        femaleSubjects.push(_subject);
      }
    });

    while (maleSubjects.length > 0 || femaleSubjects.length > 0) {
      results.forEach((sectionId, idx) => {
        if (maleSubjects.length > 0) {
          results[idx].subjects = [
            ...results[idx].subjects,
            maleSubjects.pop()
          ];
        }
        if (femaleSubjects.length > 0) {
          results[idx].subjects = [
            ...results[idx].subjects,
            femaleSubjects.pop()
          ];
        }
      });
    }

    console.log(subjects, results);
    return results;
    //create baskets
  }
}
