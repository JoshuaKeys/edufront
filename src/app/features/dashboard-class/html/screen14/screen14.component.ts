import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-screen14',
  templateUrl: './screen14.component.html',
  styleUrls: ['./screen14.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Screen14Component implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  getFirstInArr(arr) {
    return arr[0] ? arr[0] : null;
  }

  assignDropzoneClass(arr) {
    if (arr.length == 2) {
      return 'single';
    } else if (arr.length == 3) {
      return 'double';
    } else if (arr.length > 3) {
      return 'multiple';
    }
  }

  dropzoneArr = ['A', 'B', 'C', 'D'];
  badgeArr = new Array(12);
  studentsArr = [
    {
      name: 'Dianna Leach',
      gender: 'female'
    },
    {
      name: 'Karyn Holden',
      gender: 'female'
    },
    {
      name: 'Eula Ramsey',
      gender: 'female'
    },
    {
      name: 'Robertson Schultz',
      gender: 'male'
    },
    {
      name: 'Spencer Michael',
      gender: 'male'
    },
    {
      name: 'Mays Barnett',
      gender: 'male'
    },
    {
      name: 'Carlene Pace',
      gender: 'female'
    },
    {
      name: 'Barnett Dixon',
      gender: 'male'
    },
    {
      name: 'Gordon Manning',
      gender: 'male'
    },
    {
      name: 'Queen Adams',
      gender: 'female'
    },
    {
      name: 'Ora Chan',
      gender: 'female'
    },
    {
      name: 'Sweeney Hamilton',
      gender: 'male'
    },
    {
      name: 'Figueroa Gonzalez',
      gender: 'male'
    },
    {
      name: 'Della Sykes',
      gender: 'female'
    },
    {
      name: 'Anna Nash',
      gender: 'female'
    },
    {
      name: 'Lindsay Gibbs',
      gender: 'female'
    },
    {
      name: 'Bernadine Carroll',
      gender: 'female'
    },
    {
      name: 'Marci Tran',
      gender: 'female'
    },
    {
      name: 'Erickson Hansen',
      gender: 'male'
    },
    {
      name: 'Carly Stafford',
      gender: 'female'
    },
    {
      name: 'Drake Tyler',
      gender: 'male'
    },
    {
      name: 'Lucile Reeves',
      gender: 'female'
    },
    {
      name: 'Hill Jensen',
      gender: 'male'
    },
    {
      name: 'Sweet Reyes',
      gender: 'male'
    },
    {
      name: 'Cristina Nolan',
      gender: 'female'
    },
    {
      name: 'Rutledge Stephens',
      gender: 'male'
    },
    {
      name: 'Espinoza Woods',
      gender: 'male'
    },
    {
      name: 'Robbie Booker',
      gender: 'female'
    },
    {
      name: 'Hopkins Pollard',
      gender: 'male'
    },
    {
      name: 'Nita Delgado',
      gender: 'female'
    },
    {
      name: 'Henderson Wells',
      gender: 'male'
    },
    {
      name: 'Mcfadden Beard',
      gender: 'male'
    },
    {
      name: 'Malinda Vasquez',
      gender: 'female'
    },
    {
      name: 'Herrera Oneill',
      gender: 'male'
    },
    {
      name: 'Edna Everett',
      gender: 'female'
    }
  ];
}
