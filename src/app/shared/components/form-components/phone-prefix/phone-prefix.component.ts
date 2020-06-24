import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'edu-phone-prefix',
  templateUrl: './phone-prefix.component.html',
  styleUrls: ['./phone-prefix.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhonePrefixComponent implements OnInit, ControlValueAccessor {
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {}
  popoverState = false;
  disabled = false;
  _value;
  value;
  activeIndex = 0;

  set search(search) {
    this.filteredCountries = this.countryIconMap.filter(country => {
      return country.item
        .replace(' ', '')
        .toLowerCase()
        .includes(search.toLowerCase().replace(' ', ''));
    });
    console.log(this.filteredCountries);
    this.cd.markForCheck();
  }
  countryIconMap = [
    {
      id: '1c1e29e4-642b-11ea-a762-9bcb0d229311',
      item: 'United States',
      icon: 'assets/images/flags/flg-us.svg',
      phonePrefix: '+1'
    },
    {
      id: 'ab53c906-6427-11ea-a761-8b6db09d1095',
      item: 'India',
      icon: 'assets/images/flags/flg-in.svg',
      phonePrefix: '+91'
    },
    {
      id: '418bc6b4-642b-11ea-a763-33192cb50cc3',
      item: 'Canada',
      icon: 'assets/images/flags/flg-ca.svg',
      phonePrefix: '+1'
    },
    {
      id: '44f9b17e-642d-11ea-a764-d79d3a1df079',
      item: 'United Kingdom',
      icon: 'assets/images/flags/flg-uk.svg',
      phonePrefix: '+44'
    }
  ];
  filteredCountries = this.countryIconMap;

  setActiveIndex(index) {
    this.activeIndex = index;
    this.togglePopoverState();
  }
  isActiveIndex(index) {
    return this.activeIndex === index;
  }

  togglePopoverState() {
    this.popoverState = !this.popoverState;
  }
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any) {
    this.value = value;
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
