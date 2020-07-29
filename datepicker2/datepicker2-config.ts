import { IAngularMyDpOptions } from 'angular-mydatepicker';
export const myDatePickerOptions: IAngularMyDpOptions = {
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
  }
  // stylesData: {
  //   styles: `
  //           .myDpSelectorArrowLeft:after, .myDpSelectorArrowLeft:before{
  //             left : 50%;
  //           }
  //           .myDpSelectorArrowLeft:after{
  //             border-bottom-color: white;
  //           }
  //           .myDpSelector.myDpSelectorArrow.myDpSelectorArrowLeft.myDpSelectorAbsolute{
  //             padding:11px;
  //             broder-color:red;
  //             background:white;
  //           }
  //           .myDpIconLeftArrow,
  //           .myDpIconRightArrow  {

  //           }
  //           .myDpMonthBtn, .myDpYearBtn {
  //             font: 500 14px/16px Raleway;
  //             color : #212121;
  //           }
  //           .myDpIconLeftArrow::before{
  //             content:url("/assets/date-picker_arrow-left.svg") ;
  //           }
  //           .myDpIconRightArrow::before{
  //             content:url("/assets/date-picker_arrow-right.svg") ;
  //           }
  //           th.myDpWeekDayTitle{
  //             font: 600 12px/14px Raleway;
  //             color: #A5AEC7;
  //           }
  //           .myDpNextMonth  .myDpTableSingleDay, .myDpPrevMonth  .myDpTableSingleDay{
  //             font: 400 12px/14px Roboto;
  //             color:#A5AEC7;
  //           }
  //          .myDpCurrMonth  .myDpTableSingleDay{
  //             font: 400 12px/14px Roboto;
  //             color : #212121;
  //           }
  //            .myDpSelectedDay, .myDpSelectedMonth, .myDpSelectedYear  {
  //             background:unset;
  //           }

  //           .myDpDaycell:focus, .myDpMonthcell:focus, .myDpYearcell:focus {
  //             box-shadow: unset;
  //             outline-width: 0;
  //          }
  //           .myDpSelectedDay span, .myDpMarkCurrDay, .myDpMarkCurrMonth, .myDpMarkCurrYear {
  //             border-width:0px !important;
  //             color:  white;
  //             background: #69A9F2;
  //           }
  //           .myDpDayValue{
  //             width: 38px;
  //             height: 38px;
  //             display: flex;
  //             justify-content: center;
  //             align-items: center;

  //           }
  //           .myDpDaycell {
  //             border-radius: 50%;
  //           }
  //           .myDpDayValue{
  //             width: 35px;
  //             height: 35px;
  //             display: flex;
  //             border-radius: 50%;
  //             justify-content: center;
  //             align-items: center;
  //           }
  //           .myDpTableSingleMonth{
  //             width:50%;
  //           }
  //           .myDpMonthNbr{
  //             display:none;
  //           }

  //       `
  // }
  // other options here
};
