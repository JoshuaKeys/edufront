import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './features/auth/auth.module';
import { ConfigService } from './core/services/config/config.service';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ClassesAndGroupsModule } from './features/classes-and-groups/classes-and-groups.module';
import { EffectsModule } from '@ngrx/effects';
import { AuthenticatedGuard } from './guards/authenticated/authenticated-guard';
import { SchoolProfileV2Module } from './features/school-profile/school-profile-v2.module';

export function ConfigLoader(configService: ConfigService) {
  return () => configService.fetchConfig();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AuthModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([])
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: ConfigLoader, deps: [ConfigService], multi: true },
    AuthenticatedGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
