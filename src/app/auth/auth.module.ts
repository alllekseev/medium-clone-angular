import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'

import {RegisterComponent} from './register/register.component'
import {AuthRoutingModule} from './auth-routing.module'

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    RegisterComponent
  ]
})
export class AuthModule {
}
