import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'edu-name-page',
  templateUrl: './name-page.component.html',
  styleUrls: ['./name-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NamePageComponent implements OnInit {

  navBlock: object;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  this.route.data.subscribe(res => {
    this.navBlock = res;
    console.log('navBlock', this.navBlock);
    })
  }

  onNext() {
    this.router.navigate([`../${this.navBlock['next']}`], {relativeTo: this.route});
  }

  onPrevious() {
    this.router.navigate([`../${this.navBlock['previous']}`], {relativeTo: this.route});
  }

}
