import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'

import {RegisterComponent} from './components/register/register.component'
import {AuthRoutingModule} from './auth-routing.module'
import {StoreModule} from '@ngrx/store'
import {reducers} from './store/reducers'
import {AuthService} from './services/auth.service'
import {EffectsModule} from '@ngrx/effects'
import {RegisterEffect} from './store/effets/register.effect'
import {BackendErrorMessagesModule} from '../shared/modules/backend-error-messages/backend-error-messages.module'
import {PersistenceService} from '../shared/services/persistence.service'

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([RegisterEffect]),
    BackendErrorMessagesModule
  ],
  declarations: [
    RegisterComponent
  ],
  providers: [AuthService, PersistenceService]
})
export class AuthModule {
}
