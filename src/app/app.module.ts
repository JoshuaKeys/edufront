import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import {
  EntityDataModule,
  DefaultDataServiceConfig,
  EntityDataService
} from '@ngrx/data';

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
import {
  appEntityMetadata,
  defaultDataServiceConfig
} from './root-store/metadata';
import {
  ClassSectionService,
  ClassSectionDataService
} from './root-store/class-section.service';
import { TimetableStoreModule } from './root-store/timetable-store/timetable-store.module';
import { AcademicYearDataService } from './root-store/academicYear.service';

export function ConfigLoader(configService: ConfigService) {
  // return () => configService.fetchConfig();
  return () => configService.fetchConfigFromEnv();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    AuthModule,
    AppRoutingModule,
    TimetableStoreModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument(),
    EntityDataModule.forRoot({ entityMetadata: appEntityMetadata }),
    EffectsModule.forRoot([])
  ],
  providers: [
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },
    {
      provide: APP_INITIALIZER,
      useFactory: ConfigLoader,
      deps: [ConfigService],
      multi: true
    },
    AuthenticatedGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    entityDataService: EntityDataService,
    sectionsDataService: ClassSectionDataService,
    academicYearDataService: AcademicYearDataService
  ) {
    entityDataService.registerService('classSection', sectionsDataService); // <-- register it
    entityDataService.registerService('academicYear', academicYearDataService); // <-- register it
  }
}
