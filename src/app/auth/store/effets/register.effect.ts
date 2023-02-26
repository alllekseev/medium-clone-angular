import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'

import {catchError, map, of, switchMap, tap} from 'rxjs'

import {
  registerAction,
  registerFailureAction,
  registerSuccessAction
} from '../actions/register.action'
import {AuthService} from '../../services/auth.service'
import {CurrentUserInterface} from '../../../shared/types/current-user.interface'
import {HttpErrorResponse} from '@angular/common/http'
import {PersistenceService} from '../../../shared/services/persistence.service'
import {Router} from '@angular/router'

@Injectable()
export class RegisterEffect {
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerAction),
      switchMap(({request}) =>
        this.authService.register(request)
          .pipe(
            map((currentUser: CurrentUserInterface) => {
              this.persistenceService.set('accessToken', currentUser.token)
              return registerSuccessAction({currentUser})
            }),
            catchError((errorResponse: HttpErrorResponse) =>
              of(registerFailureAction({errors: errorResponse.error.errors})))
          )
      )
    )
  )

  redirectAfterSubmit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerSuccessAction),
      tap(() =>
        this.router.navigateByUrl('/')
      )
    ),
    {dispatch: false}
  )

  constructor(private actions$: Actions,
              private router: Router,
              private authService: AuthService,
              private persistenceService: PersistenceService) {
  }
}
