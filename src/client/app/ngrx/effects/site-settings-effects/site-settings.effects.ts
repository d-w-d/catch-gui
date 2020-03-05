import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, interval } from 'rxjs';
import {
  mergeMap,
  catchError,
  map,
  withLatestFrom,
  mapTo,
  distinctUntilChanged
} from 'rxjs/operators';
import { LocalStorageService } from 'src/client/app/core/services/local-storage/local-storage.service';
import {
  ESiteSettingsActionTypes,
  SiteSettingsSetAll,
  SiteSettingsSetHour
} from '../../actions/site-settings.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';

@Injectable()
export class SiteSettingsEffects {
  //

  constructor(
    private actions$: Actions<any>,
    private localStorageService: LocalStorageService,
    private store$: Store<AppState>
  ) {}

  // changeHour = createEffect(() =>
  //   interval(60_000).pipe(
  //     mapTo(new Date().getHours()),
  //     distinctUntilChanged(),
  //     map(hour => actionSettingsChangeHour({ hour }))
  //   )
  // );

  @Effect()
  // Check the hour every 60s
  changeHour$: Observable<any> = interval(60_000).pipe(
    mapTo(new Date().getHours()),
    distinctUntilChanged(), // Only emit when input changes
    map(hour => new SiteSettingsSetHour({ hour })) // Set new hour
  );

  @Effect()
  loadSiteSettings$: Observable<any> = this.actions$.pipe(
    ofType(ESiteSettingsActionTypes.SiteSettingsLoadAllFromLocalStorage),
    map(data => {
      // console.log('Effects pipeline pinged');
      const siteSettings = this.localStorageService.getLocalStorageState();
      return new SiteSettingsSetAll({ siteSettings });
    })
  );

  @Effect({ dispatch: false })
  updateLocalStorage$: Observable<any> = this.actions$.pipe(
    ofType(
      ESiteSettingsActionTypes.SiteSettingsSetAll,
      ESiteSettingsActionTypes.SiteSettingsSetSiteTheme,
      ESiteSettingsActionTypes.SiteSettingsSetIsPageAnimated,
      ESiteSettingsActionTypes.SiteSettingsIsAutoNightMode
    ),
    map(data => {
      // console.log('data');
      return data;
    }),

    withLatestFrom(this.store$),
    map(data => {
      const siteSettingsSubstate = data[1].siteSettingsSubstate;
      // this.localStorageService.setItem('siteTheme', siteSettingsSubstate.siteTheme);
      this.localStorageService.setLocalStorageState(siteSettingsSubstate); //.setItem('siteTheme', siteSettingsSubstate.siteTheme);
    })
  );
}
