import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './features/auth/auth.module';
import { ConfigService } from './core/services/config/config.service';

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
    AppRoutingModule
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: ConfigLoader, deps: [ConfigService], multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
