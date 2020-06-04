import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';

@Component({
  selector: 'edu-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DatepickerComponent)
    }
  ]
})
export class DatepickerComponent implements OnInit, ControlValueAccessor {
  constructor() {}

  ngOnInit(): void {}

  model: IMyDateModel = null;

  onInputBlur() {
    this.updateDatePickerModel();
  }

  updateDatePickerModel() {
    this.value = this.val;
    let day = parseInt(this.val.substring(0, 2));
    let month = parseInt(this.val.substring(3, 5));
    let year = parseInt(this.val.substring(6, 8));
    year = year < 50 ? year + 2000 : year + 1900;

    let model: IMyDateModel = {
      isRange: false,
      singleDate: {
        jsDate: new Date(),
        date: { year, month, day }
      },
      dateRange: null
    };
    this.model = model;
    console.log(this.model);
  }

  onDateChanged(event: IMyDateModel): void {
    // date selected
    let dateObj = event.singleDate.date;
    console.log(event);
    this.value = `${this.formatDayMonth(dateObj.day)}/${this.formatDayMonth(
      dateObj.month
    )}/${this.formatYear(dateObj.year)}`;
  }

  val;
  set value(val) {
    // this value is updated by programmatic changes if( val !== undefined && this.val !== val){
    this.val = val;
    this.onChange(val);
    this.onTouched();
    // this.onTouched(val)
  }

  formatDayMonth(param) {
    return param < 10 ? `0${param}` : `${param}`;
  }
  formatYear(param) {
    return param.toString().substring(2, 4);
  }

  myDatePickerOptions: IAngularMyDpOptions = {
    selectorWidth: '286px',
    selectorHeight: '280px',
    dateFormat: 'dd/mm/yyyy',
    markCurrentDay: false,
    markCurrentMonth: false,
    markCurrentYear: false,
    sunHighlight: false,
    satHighlight: false,
    showMonthNumber: false,
    monthLabels: {
      1: 'January ',
      2: 'February ',
      3: 'March ',
      4: 'April ',
      5: 'May',
      6: 'June ',
      7: 'July ',
      8: 'August ',
      9: 'September',
      10: 'October',
      11: 'November',
      12: 'December'
    },
    stylesData: {
      styles: `
            
            
            .myDpSelectorArrowLeft:after, .myDpSelectorArrowLeft:before{
              left : 50%;
           
            }
            .myDpSelectorArrowLeft:after{
              border-bottom-color: white;
            }
            .myDpSelector.myDpSelectorArrow.myDpSelectorArrowLeft.myDpSelectorAbsolute{
              padding:11px;
              broder-color:red;
              background:white;
            }
        
           
            .myDpIconLeftArrow,
            .myDpIconRightArrow  {
      
            }  
            .myDpMonthBtn, .myDpYearBtn {
              font: 500 14px/16px Raleway;
              color : #212121;
            }
            .myDpIconLeftArrow::before{
              content:url("/assets/date-picker_arrow-left.svg") ; 
            }
            .myDpIconRightArrow::before{
              content:url("/assets/date-picker_arrow-right.svg") ; 
            }

            

         
            th.myDpWeekDayTitle{
              font: 600 12px/14px Raleway;
              color: #A5AEC7;
            
            }
            
            .myDpNextMonth  .myDpTableSingleDay, .myDpPrevMonth  .myDpTableSingleDay{
              font: 400 12px/14px Roboto;
              color:#A5AEC7;
            }

           .myDpCurrMonth  .myDpTableSingleDay{
              font: 400 12px/14px Roboto;
              color : #212121;
            }

           
             .myDpSelectedDay, .myDpSelectedMonth, .myDpSelectedYear  {  
              background:unset;
            }
          
            .myDpDaycell:focus, .myDpMonthcell:focus, .myDpYearcell:focus {
              box-shadow: unset;
              outline-width: 0;
           }
            
            .myDpSelectedDay span, .myDpMarkCurrDay, .myDpMarkCurrMonth, .myDpMarkCurrYear { 
              border-width:0px !important;
              color:  white;
              background: #69A9F2;
            }

            .myDpDayValue{
              width: 38px;
              height: 38px;
              display: flex;
              justify-content: center;
              align-items: center;
        
            }
        

        

            .myDpDaycell {
              border-radius: 50%;
            }
            .myDpDayValue{
              width: 35px;
              height: 35px;
              display: flex;
              border-radius: 50%;
              justify-content: center;
              align-items: center;
            }

        

            .myDpTableSingleMonth{
              width:50%;
            }

            .myDpMonthNbr{
              display:none;
            }
        
    
        `
    }
    // other options here
  };

  onChange: any = () => {};
  onTouched: any = () => {};
  disabled: boolean = false;
  writeValue(value: any) {
    this.value = value;
    this.updateDatePickerModel();
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
