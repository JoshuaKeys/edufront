import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'edu-timetable-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit {
  classes = new BehaviorSubject([
    {
      name: '6',
      grade: 6,
      classGroupId: 'fcf5ac48-49d3-43a6-81df-ad437663fad5',
      id: 'b96a53c2-8df6-11ea-9720-1323d471c03e',
      teachers: [],
      subjects: []
    },
    {
      name: '7',
      grade: 7,
      classGroupId: '3f44677c-0c74-48cf-8052-0dfa7e134bb6',
      id: 'c57c06ba-8df6-11ea-9721-a773ed0f79c6',
      teachers: [],
      subjects: []
    },
    {
      name: '9',
      grade: 9,
      classGroupId: '3f44677c-0c74-48cf-8052-0dfa7e134bb6',
      id: 'e0b640e4-8df6-11ea-9723-1b56557aa5e9',
      teachers: [],
      subjects: []
    },
    {
      name: '10',
      grade: 10,
      classGroupId: '7807e313-32d1-4953-a1d9-b87c60d5d8d9',
      id: 'ed1a9344-8df6-11ea-9724-cb37ccbda8c1',
      teachers: [],
      subjects: []
    },
    {
      name: '11',
      grade: 11,
      classGroupId: '7807e313-32d1-4953-a1d9-b87c60d5d8d9',
      id: 'f7966d8e-8df6-11ea-9725-1ba133b5817d',
      teachers: [],
      subjects: []
    },
    {
      name: '12',
      grade: 12,
      classGroupId: '7807e313-32d1-4953-a1d9-b87c60d5d8d9',
      id: '0b0a55e2-8df7-11ea-9726-57ffaf54a22e',
      teachers: [],
      subjects: []
    },
    {
      name: '5',
      grade: 5,
      classGroupId: 'fcf5ac48-49d3-43a6-81df-ad437663fad5',
      id: 'aea8dd8c-8df6-11ea-971f-cb02491d4175',
      teachers: [],
      subjects: []
    },
    {
      name: '8',
      grade: 8,
      classGroupId: '3f44677c-0c74-48cf-8052-0dfa7e134bb6',
      id: 'd3a6d490-8df6-11ea-9722-ab05ab4c71a9',
      teachers: [],
      subjects: []
    },
    {
      name: '1',
      grade: 1,
      classGroupId: '3b16f13c-91da-11ea-8eeb-063100681874',
      id: '855b9348-8df6-11ea-971b-a35658713d38',
      teachers: [],
      subjects: []
    },
    {
      name: '3',
      grade: 3,
      classGroupId: '3b16f13c-91da-11ea-8eeb-063100681874',
      id: '960edaba-8df6-11ea-971d-eb1e97cddd39',
      teachers: [],
      subjects: []
    },
    {
      name: '4',
      grade: 4,
      classGroupId: '3b16f13c-91da-11ea-8eeb-063100681874',
      id: 'a1f84fb4-8df6-11ea-971e-3f7df9a327fb',
      teachers: [],
      subjects: []
    },
    {
      name: '2',
      grade: 2,
      classGroupId: '3b16f13c-91da-11ea-8eeb-063100681874',
      id: '8e33f4c4-8df6-11ea-971c-af6cdeacf7b0',
      teachers: [],
      subjects: []
    }
  ]);
  sections = new BehaviorSubject([
    {
      id: '6950a189-405e-4c92-8e15-f2e3743547ab',
      sectionName: '4',
      classId: '855b9348-8df6-11ea-971b-a35658713d38',
      studentIds: null
    },
    {
      id: '5cf56526-1550-4fef-a4f6-4da3f7eb10af',
      sectionName: '2',
      classId: '8e33f4c4-8df6-11ea-971c-af6cdeacf7b0',
      studentIds: null
    },
    {
      id: '5f9a89c8-0528-4f0b-a6c5-c037bccfdc06',
      sectionName: '1',
      classId: '855b9348-8df6-11ea-971b-a35658713d38',
      studentIds: null
    },
    {
      id: '294b0f1c-b324-4606-a9a7-6bc54b67b882',
      sectionName: '2',
      classId: '855b9348-8df6-11ea-971b-a35658713d38',
      studentIds: null
    },
    {
      id: '0d68d47a-2309-47b1-92ba-082c814b2a11',
      sectionName: '3',
      classId: '855b9348-8df6-11ea-971b-a35658713d38',
      studentIds: null
    },
    {
      id: 'a1150223-04fc-4aee-982c-b04b4f35e3a5',
      sectionName: '4',
      classId: '855b9348-8df6-11ea-971b-a35658713d38',
      studentIds: null
    },
    {
      id: '12c86d65-7e4b-427f-a8f2-2b2f6f327286',
      sectionName: '1',
      classId: '855b9348-8df6-11ea-971b-a35658713d38',
      studentIds: null
    },
    {
      id: 'cbb85575-c1e9-409d-bacc-82ab5e08fb28',
      sectionName: '2',
      classId: '855b9348-8df6-11ea-971b-a35658713d38',
      studentIds: null
    },
    {
      id: '0f408a13-82b5-4e6a-8dd7-d878be59709a',
      sectionName: '3',
      classId: '855b9348-8df6-11ea-971b-a35658713d38',
      studentIds: null
    },
    {
      id: '75e1887d-8208-4a98-bb00-7b79c49f5e6b',
      sectionName: '1',
      classId: '8e33f4c4-8df6-11ea-971c-af6cdeacf7b0',
      studentIds: null
    },
    {
      id: 'f4325f01-bdf3-4f95-aa22-c3bcef1c3813',
      sectionName: '2',
      classId: '8e33f4c4-8df6-11ea-971c-af6cdeacf7b0',
      studentIds: null
    },
    {
      id: '3cb36666-5a41-41ea-ac3d-4ff62877ffd2',
      sectionName: '3',
      classId: '8e33f4c4-8df6-11ea-971c-af6cdeacf7b0',
      studentIds: null
    },
    {
      id: '7ce705ad-65cd-4bfe-887b-1c9f1b16ec2a',
      sectionName: 'A',
      classId: '8e33f4c4-8df6-11ea-971c-af6cdeacf7b0',
      studentIds: null
    },
    {
      id: 'f4d93d90-d80e-4ae6-ba58-caae1f527a55',
      sectionName: 'B',
      classId: '8e33f4c4-8df6-11ea-971c-af6cdeacf7b0',
      studentIds: null
    },
    {
      id: 'be701bd3-079b-4bd0-8f4c-ff96696d61a6',
      sectionName: 'A',
      classId: '855b9348-8df6-11ea-971b-a35658713d38',
      studentIds: null
    },
    {
      id: '84585a65-5bd2-405c-80e4-d5638b6832ed',
      sectionName: 'A',
      classId: '855b9348-8df6-11ea-971b-a35658713d38',
      studentIds: null
    },
    {
      id: 'fe4864aa-b733-4247-b4b9-ee95012cf238',
      sectionName: 'jnks',
      classId: '855b9348-8df6-11ea-971b-a35658713d38',
      studentIds: null
    },
    {
      id: 'd68a6ec8-1be5-49ea-8467-abbcf89cc109',
      sectionName: 'A',
      classId: '8e33f4c4-8df6-11ea-971c-af6cdeacf7b0',
      studentIds: null
    }
  ]);
  constructor() {}

  ngOnInit(): void {}

  onModalBtnClicked() {
    // this.store.dispatch(closeSubjectsStartModal())
  }

  onClassClicked(id: string) {
    console.log(id);
  }
}
