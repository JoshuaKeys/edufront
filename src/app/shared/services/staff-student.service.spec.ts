import { TestBed } from '@angular/core/testing';

import { StaffStudentService } from './staff-student.service';

describe('StaffStudentService', () => {
  let service: StaffStudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaffStudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
