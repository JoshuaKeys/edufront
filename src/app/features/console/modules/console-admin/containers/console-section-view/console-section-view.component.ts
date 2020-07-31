import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ConsoleClassesStateModel } from '../../models/console-classes-state.model';
import { Store } from '@ngrx/store';
import { selectAggregatedSectionsData } from '../../ngrx/selectors/console-classes';
import { fetchSectionData } from '../../ngrx/actions/console-classes/console-sections.actions';
import { AggregatedResult } from '../../models/aggregated-result.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'edu-console-section-view',
  templateUrl: './console-section-view.component.html',
  styleUrls: ['./console-section-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsoleSectionViewComponent implements OnInit {
  aggregatedSectionsData: Observable<AggregatedResult[]>;
  ngOnInit(): void {
    this.aggregatedSectionsData = this.store.select(selectAggregatedSectionsData);
    this.aggregatedSectionsData.subscribe(console.log)
    this.store.dispatch(fetchSectionData())
    this.classArr = this.classArr.map(val => {
      let randomClassArr = this.getRandomClassArr();
      return randomClassArr;
    });
    this.cd.markForCheck();
  }
  badgeArr = new Array(12);
  classArr = new Array(12).fill([]);
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

  getRandomClassArr() {
    let randomInt = Math.floor(Math.random() * 4) + 2;
    let classValues = [
      'A',
      'Bohbohchacha',
      'Classlong longonglongngggggasd ',
      'D',
      'E',
      'Firetruck burn burn burn'
    ];

    return classValues.filter((value, idx) => idx <= randomInt);
  }
  constructor(private cd: ChangeDetectorRef, private store: Store<ConsoleClassesStateModel>) { }
}
