import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SpecialPeriod , Day, TimetableModel} from "../../../shared/components/timetable/timetable.interface";

import { Output, EventEmitter, HostListener } from "@angular/core"
@Component({
  selector: 'edu-calendar-test',
  templateUrl: './calendar-test.component.html',
  styleUrls: ['./calendar-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarTestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

 

  time=[ {value:"7:45", isSingleRow:true},{value:"8:00"},{value:"9:00"},{value:"9:45", isSingleRow:true},{value:"10:00"},{value:"11:00"},{value:"11:45", isSingleRow:true},{value:"12:00"}  ];
  days=["mon","tue","wed","thu","fri","sat","sun"]
  specialPeriods:SpecialPeriod[]=[ 
    // must be declared in ascending order, earliest first and latest last  , 
    //all breaks with   changeTimeToSingle set to TRUE must be delcared first as well
    {
   
      time:"7:45",  
      text:"Assembly",
      color: "#69a9f2",
      start:Day.mon,
      end:Day.sun,
    },
    {
   
      time:"9:45",
      text:"break",
      color: "#69a9f2",
      start:Day.mon,
      end:Day.sun,
    },
    {
   
      time:"11:45",
      text:"break",
      color: "#69a9f2",
      start:Day.mon,
      end:Day.mon,
    },
    {
   
      time:"11:45",
      text:"break",
      color: "#69a9f2",
      start:Day.thu,
      end:Day.sun,
    },
    {
   
      time:"10:00",
      text:"break",
      color: "#69a9f2",
      start:Day.wed,
      end:Day.wed,
      inFirstHalf:true
    },
    {
   
      time:"11:00",
      text:"break",
      color: "#69a9f2",
      start:Day.wed,
      end:Day.wed,
      inFirstHalf:false
    }

  ];
  model:TimetableModel = {
    mon:[{key:"m1", value:"0"}, {key:"m2", value:"0"}, {key:"m3", value:"0"},{key:"m4", value:"0"},{key:"m5", value:"0"}],
    tue:[{key:"t1", value:"0"}, {key:"t2", value:"0"}, {key:"t3", value:"0"},{key:"t4", value:"0"},{key:"t5", value:"0"}],
    wed:[{key:"w1", value:"0"}, {key:"w2", value:"0"}, {key:"w3", value:"0"},{key:"w4", value:"0"},{key:"w5", value:"0"}],
    thu:[{key:"th1", value:"0"}, {key:"th2", value:"0"}, {key:"th3", value:"0"},{key:"th4", value:"0"},{key:"m5", value:"0"}],
    fri:[{key:"f1", value:"0"}, {key:"f2", value:"0"}, {key:"f3", value:"0"},{key:"f4", value:"0"},{key:"f5", value:"0"}],
    sat:[{key:"sa1", value:"0"}, {key:"sa2", value:"0"}, {key:"sa3", value:"0"},{key:"sa4", value:"0"},{key:"sa5", value:"0"}],
    sun:[{key:"su1", value:"0"}, {key:"su2", value:"0"}, {key:"su3", value:"0"},{key:"su4", value:"0"},{key:"su5", value:"0"}],
    
  };

}
