import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, BehaviorSubject, concat } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';

import { AppState } from '../../reducers';
import { getDevice } from '@client/app/utils/get-device';
import { IScreenDevice } from '@client/app/models/screen-device.model';
import {
  ScreenDeviceSetDevice,
  ScreenDeviceSetScreenWidth,
  ScreenDeviceActions
} from '../../actions/screen-device.actions';

@Injectable()
export class ScreenDeviceEffects {
  //
  resizeEvent$ = new BehaviorSubject<Partial<IScreenDevice>>({
    device: getDevice(),
    screenWidthPxls: window.outerWidth
  });

  constructor(private actions$: Actions<ScreenDeviceActions>, private store$: Store<AppState>) {
    window.addEventListener('resize', () => {
      setTimeout(() => {
        this.resizeEvent$.next({
          device: getDevice(),
          screenWidthPxls: window.outerWidth
        });
      }, 500);
    });
  }

  @Effect()
  checkScreen$: Observable<ScreenDeviceActions> = this.resizeEvent$.asObservable().pipe(
    debounceTime(1000),
    distinctUntilChanged(),
    switchMap(_ => {
      return concat(
        of(new ScreenDeviceSetDevice({ device: _.device })),
        of(new ScreenDeviceSetScreenWidth({ width: _.screenWidthPxls }))
      );
    })
  );
}
