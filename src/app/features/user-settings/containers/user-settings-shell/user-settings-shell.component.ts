import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-user-settings-shell',
  templateUrl: './user-settings-shell.component.html',
  styleUrls: ['./user-settings-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSettingsShellComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }



  
  activeSideMenuOption = {value :"users", text:"Users"};
 
  sideMenuOptions = [
    {value :"home", text:"Home"},
    {value :"classes", text:"Classes"},
    {value :"users", text:"Users"},
    {value :"assessment", text:"Assessment"},
    {value :"course", text:"Course"},
    {value :"files", text:"My Files"},
    {value :"results", text:"Results"}
  ]

  setActiveOption(option){
    this.activeSideMenuOption = option;
  }

  isActiveOption(option){
    return  option.value === this.activeSideMenuOption.value;
  }




}
