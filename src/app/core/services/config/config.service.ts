import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import get from 'lodash/get';
import { environment } from 'src/environments/environment';
import { from, of } from 'rxjs';
// import { from } from 'rxjs';
@Injectable()
export class ConfigService {
  config: any;

  constructor(private http: HttpClient) {}
  fetchConfigFromEnv() {
    return new Promise((resolve, reject) => {
      let config;

      // if (window.location.hostname === 'localhost') {
      //   // console.log('LOCAL TEST');
      //   config = 'environments/environment.ts';
      // } else {
      //   config = 'environments/environment.ts';
      //   // console.log('BUILD TEST');
      //   // config = window.location.hostname.replace('www.', '').split('.')[0] + '-config.json';
      // }

      of(environment.config).subscribe(
        res => {
          // console.log('succesS ?', res);
          this.config = res;
          resolve();
        },
        err => {
          reject(err);
        }
      );

      // this.http
      //   .get(`${window.location.origin}/${config}`)
      //   .toPromise()
      //   .then(
      //     res => {
      //       console.log(res);
      //       this.config = res;
      //       resolve();
      //     },
      //     err => reject(err)
      //   );
    });
  }

  fetchConfig() {
    return new Promise((resolve, reject) => {
      let config;

      if (window.location.hostname === 'localhost') {
        config = 'assets/config.json';
      } else {
        config =
          window.location.hostname.replace('www.', '').split('.')[0] +
          '-config.json';
      }

      this.http
        .get(`${window.location.origin}/${config}`)
        .toPromise()
        .then(
          res => {
            this.config = res;
            resolve();
          },
          err => reject(err)
        );
    });
  }

  get(path) {
    return path ? get(this.config, path) : this.config;
  }
}
