
# SCSS Guide
Location of elements are all listed here, please refer to their individual files for more detailed explanation on their respective classes and modifiers. 

Most elements/components are styled using BEM methodology to reduce nesting of CSS selectors, allowing for easy overwrites.

##  Components
Generic components that are not buttons or  form elements are located in **/scss/mixins/_components.scss**. Element(s) included are 

 - popup 
 - roundBadge 
 - chip 
 - search 
 - tooltip
 - 
##  Buttons
Buttons are located in **/scss/mixins/_buttons.scss**. Element(s) included are 
 - button default - default button styling
 - round button - round buttons
 - icon button  
 - text button

## Forms
All forms components except for buttons are implemented in **/scss/mixins/_forms.scss**. Element(s) included are 

 - text input element, 
 - select - normal select with text, 
 - iconSelect - select with icon only,
 - date (work in progress)

## Layout
Generic layouts are implemented in **/scss/mixins/_layout.scss**.   Files used includes,

- sectionLayout3 - used across all modules for the main,aside,section styling
- stepsLayout - used in steps/timeline at start and end of each module
- timelineLayout - used in steps/timeline at start and end of each module

## Containers
Generic containers used  are implemented in **/scss/mixins/_containers.scss**.   Containers included are
  
 - modalComplete
 - modalIntro  
 - modalForm
 - modal       
 - card 
 - dropZone  
 - groups       
 - group
