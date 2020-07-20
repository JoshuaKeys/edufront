import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-screen20',
  templateUrl: './screen20.component.html',
  styleUrls: ['./screen20.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Screen20Component implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  toggleSidePanel() {
    this.sidePanelIsActive = !this.sidePanelIsActive;
  }
  sidePanelIsActive = false;
  badgeArr = new Array(12);
  testArr = new Array(120);
  subSubjectsArr = ['Algebra', 'Geometry'];
  subjectsArr = [
    'Mathematics',

    'Science',
    'Health',
    'Handwriting',
    'Physical Education (P.E.)',
    'Art',
    'Music',
    'Instrumental Music – specific instrument',
    'Movement or Eurythmy',
    'Handwork or handcrafts',
    'Life Lab or gardening',
    'Dramatics',
    'Dance',
    'Spanish or other foreign language',
    'Leadership',
    'Special Education Day Class',
    'Resource Program',
    'Speech',
    'Adaptive P.E.',
    'Occupational Therapy',
    'Middle School Subjects',
    'CORE',

    'Reading',
    'Language arts',
    'Speech and Debate',
    'English',
    'Basic Math',
    'Pre-algebra',
    'Consumer Math',
    'Algebra',
    'Geometry',
    'Honors Math in Algebra or Geometry',
    'Life Science',
    'Earth Science',
    'Physical Science',
    'Health',
    'Social Studies',
    'Geography',
    'Ancient Civilizations',
    'Medieval and Renaissance',
    'U.S. History and Government',
    'French / Spanish / Latin',
    'Computer Science or Lab',
    'Art',
    'Home Economics',
    'Woodshop',
    'Metal Shop',
    'Business Technology',
    'Instrumental Music',
    'Band',
    'Choir',
    'Drama',
    'Physical Education',
    'Sports',
    'Special Education Day Class',
    'Resource Program',
    'Speech Therapy',
    'Occupational Therapy'
  ];
}
