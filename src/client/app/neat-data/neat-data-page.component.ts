import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { NeatObjectQueryFetchResults } from '@client/app/ngrx/actions/neat-object-query.actions';
import { selectScreenDeviceSubstate } from '../ngrx/selectors/screen-device.selectors';
import { selectNavigationRecords } from '../ngrx/selectors/navigation.selectors';
import { IScreenDevice } from '../models/screen-device.model';
import { AppState } from '@client/app/ngrx/reducers';
import { selectNeatObjectQueryResults } from '../ngrx/selectors/neat-object-query.selectors';

@Component({
  selector: 'app-neat-data-page',
  templateUrl: './neat-data-page.component.html',
  styleUrls: ['./neat-data-page.component.scss']
})
export class NeatDataPageComponent implements OnInit, OnDestroy {
  //

  subscriptions = new Subscription();
  device$: Observable<IScreenDevice['device']>;
  objid: string;

  // This HostBinding is equivalent to: <app-about-page [ngClass]="variableClassName"></...>
  @HostBinding('class') variableClassName = '';

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    //

    // Extract query param from url
    this.route.queryParams.subscribe(params => {
      const objectName = (this.objid = params.objid);
      if (!!objectName) {
        // If there are no neat results then fetch them using objid
        this.store
          .select(selectNeatObjectQueryResults)
          .pipe(take(1))
          .subscribe(results => {
            if (!results.length) {
              this.store.dispatch(new NeatObjectQueryFetchResults({ objectName }));
            }
          });
      }
    });

    // Delay start of page animation if navigating from home page
    this.subscriptions.add(
      this.store.select(selectNavigationRecords).subscribe(navSubstate => {
        const isAnimatedFromHomePage = navSubstate.previousRoute === '/';
        this.variableClassName = isAnimatedFromHomePage ? 'delayed-page-animation' : '';
      })
    );

    this.device$ = this.store.select(selectScreenDeviceSubstate).pipe(
      map(substate => {
        return substate.device;
      })
    );
  }

  ngOnInit() {}

  ngOnDestroy() {}
}
