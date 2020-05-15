import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppService } from '../services/app/app.service';
import { AuthService } from './services/auth/auth.service';
import { ConfigService } from './services/config/config.service';


@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule
  ],
  providers: [
    AppService,
    AuthService,
    ConfigService,
  ]
})
export class CoreModule { }
