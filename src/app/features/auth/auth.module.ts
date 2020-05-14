import { NgModule } from '@angular/core';
import { EqualsToFieldValidatorDirective } from './directives/equals-to-field-validator.directive';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './ngrx/reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './ngrx/effects';

@NgModule({
  imports: [
    AuthRoutingModule,
    SharedModule,
    HttpClientModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  declarations: [
    SignInComponent,
    EqualsToFieldValidatorDirective
  ],
  exports: [
    SignInComponent,
  ],
  providers: [
    AuthService,
    ConfigService,
  ]
})
export class AuthModule {
}
