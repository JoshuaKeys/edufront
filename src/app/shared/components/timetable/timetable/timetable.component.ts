import { Component, OnInit, ChangeDetectionStrategy , Input, ContentChild, TemplateRef, HostListener, Host} from '@angular/core';
import {SpecialPeriod, Day, TimetableModel, Time } from "../timetable.interface";
@Component({
  selector: 'edu-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimetableComponent implements OnInit {



  @HostListener("onTemplateChange") onChange(value){
    console.log("onchange")
  }

  @HostListener("valueChange",["$event"]) onValueChange($event){
    console.log("valueChange")
  }


  templateOnChangeEvent(){
    console.log("onchange1")
  }
  @Input() model: TimetableModel;
  @Input() time:Time[]; //has to be defined in ascending order
  @Input() days : Day[];
  @Input() specialPeriods:SpecialPeriod[];
  @ContentChild('template',{static: false}) periodTemplate: TemplateRef<any>;
  constructor() { }
  
  timeClasses = [];
  calendar = {}; // basically the value object

  ngOnInit(): void {
    this.timeClasses =  new Array(this.time.length).fill([]); 


    this.setTimeFormatting(); //needs to be first
    this.initSpecialPeriods();
    // this.generateModel();
    

  }

 


  setTimeFormatting(){  
    let classToAdd = 'single-row'; 
    this.time
    .map((time,index)=>{  
      let classDoesntExist =  this.timeClasses[index].indexOf(classToAdd) == -1;
      if(time.isSingleRow && classDoesntExist ){
        this.timeClasses[ index ]= [...this.timeClasses[index], classToAdd]
      }
   
    })

  }

  initSpecialPeriods(){//rework this
    this.specialPeriods.forEach((_sp,i)=>{ 
 
      _sp.classes = []
  
      let rowCount = 0;
      this.timeClasses.forEach(()=>{


      })
      
      _sp.classes.push( `r${( this.getSpecialPeriodRow(_sp.time, _sp.inFirstHalf))}` ) 
      _sp.classes.push( `c${( this.days.indexOf(_sp.start)  + 1)}` ) 
      _sp.classes.push( `ce${( this.days.indexOf(_sp.end)  + 1)}` ) 
      
    
    })
  }


  getSpecialPeriodRow(_time:string, isInFirstHalf:boolean ){
    let rowCount = 0;
    let count = 0;

  
    let timeIndex= -1;
     this.time.map((time,index)=>{
       if(time.value == _time){
        timeIndex = index;
       }
     });


    while( count <= timeIndex ){
      if( this.timeClasses[count].indexOf('single-row') == -1){
        rowCount += 2;
      }else{
        rowCount += 1;
      }
      count += 1;
    }


    if(isInFirstHalf != undefined && isInFirstHalf){
       rowCount -= 1;
    }
    return rowCount

  }

}


