import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import get from 'lodash/get';

@Injectable()
export class ConfigService {
  config: any;

  constructor(private http: HttpClient) {
  }

  fetchConfig() {
    return new Promise((resolve, reject) => {
      let config;

      if (window.location.hostname === 'localhost') {
        config = 'assets/config.json';
      } else {
        config = window.location.hostname.replace('www.', '').split('.')[0] + '-config.json';
      }

      this.http.get(`${window.location.origin}/${config}`).toPromise().then(res => {
        this.config = res;
        resolve();
      }, err => reject(err));
    });
  }

  get(path) {
    // console.log(this.config)
    // console.log(get(this.config, path));
    return path ? get(this.config, path) : this.config;
  }
}
