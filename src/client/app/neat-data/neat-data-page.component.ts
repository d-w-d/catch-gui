import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import {
  NeatObjectQueryFetchResults,
  NeatObjectQuerySetStatus
} from '@client/app/ngrx/actions/neat-object-query.actions';
import {
  selectScreenDeviceSubstate,
  selectScreenDeviceEffectiveDevice
} from '../ngrx/selectors/screen-device.selectors';
import { selectNavigationRecords } from '../ngrx/selectors/navigation.selectors';
import { IScreenDevice, TDevices } from '../models/screen-device.model';
import { AppState } from '@client/app/ngrx/reducers';
import { selectNeatObjectQueryResults } from '../ngrx/selectors/neat-object-query.selectors';
import {
  selectSiteSettingsTheme,
  selectSiteSettingsEffectiveTheme
} from '../ngrx/selectors/site-settings.selectors';
import { TPermittedTheme } from '../models/site-settings.model';

interface ILatestData {
  effectiveTheme: TPermittedTheme;
  effectiveDevice: IScreenDevice['device'];
  isMobile: boolean;
}
@Component({
  selector: 'app-neat-data-page',
  templateUrl: './neat-data-page.component.html',
  styleUrls: ['./neat-data-page.component.scss']
})
export class NeatDataPageComponent implements OnInit, OnDestroy {
  //

  subscriptions = new Subscription();
  objid: string;
  isUiDrawn = false;
  selectedLayout = 'mobile';
  triSize = 20;
  theme$: Observable<TPermittedTheme>;
  latestData$: Observable<ILatestData>;

  // This HostBinding is equivalent to: <app-about-page [ngClass]="variableClassName"></...>
  @HostBinding('class') variableClassName = '';

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router
  ) {
    // Extract query param from url
    this.subscriptions.add(
      combineLatest([
        this.store.select(selectNeatObjectQueryResults),
        this.route.queryParams.pipe(
          map(params => {
            const objectName = (this.objid = params.objid);
            return objectName;
          })
        )
      ])
        .pipe(
          map(([results, objectName]) => {
            return { results, objectName };
          })
        )
        .subscribe(({ results, objectName }) => {
          if (!objectName) {
            // If no object name given, then go back home
            this.router.navigate([''], {});
            return;
          }

          // If results is not array then they've never been fetched
          // so fetch them using objid
          if (!results) {
            this.store.dispatch(
              new NeatObjectQuerySetStatus({
                code: 'searching',
                message: 'Begin searching....',
                objid: objectName
              })
            );
            this.store.dispatch(new NeatObjectQueryFetchResults({ objectName }));
          } else {
            this.isUiDrawn = true;
          }
        })
    );

    // Delay start of page animation if navigating from home page
    this.subscriptions.add(
      this.store.select(selectNavigationRecords).subscribe(navSubstate => {
        const isAnimatedFromHomePage = navSubstate.previousRoute === '/';
        this.variableClassName = isAnimatedFromHomePage ? 'delayed-page-animation' : '';
      })
    );

    // Get display params
    this.latestData$ = combineLatest([
      this.store.select(selectSiteSettingsEffectiveTheme),
      this.store.select(selectScreenDeviceEffectiveDevice),
      this.store.select(selectScreenDeviceSubstate)
    ]).pipe(
      map(
        ([effectiveTheme, effectiveDevice, screenDeviceSubstate]): ILatestData => {
          return {
            effectiveTheme,
            effectiveDevice,
            isMobile: screenDeviceSubstate.device === 'mobile'
          };
        }
      )
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  refresh() {
    // console.log('>>>>>');
    this.isUiDrawn = false;
    setTimeout(() => (this.isUiDrawn = true), 0);
  }

  getLayoutClass(effectiveDevice: TDevices) {
    const layoutClass = effectiveDevice + '-layout';
    // console.log('layoutClass', layoutClass);
    return layoutClass;
  }

  getTriPath() {
    const triSize = this.triSize;
    return `M0 ${triSize} L${triSize} ${triSize} L${triSize} 0 Z`;
  }
}
