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
  ) {}
}
