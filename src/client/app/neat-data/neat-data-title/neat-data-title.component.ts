import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { ScreenDeviceSetLayout } from '../../ngrx/actions/screen-device.actions';
import { AppState } from '@client/app/ngrx/reducers';
import { IScreenDevice } from 'src/client/app/models/screen-device.model';
import { Observable, interval, combineLatest } from 'rxjs';
import { map, distinctUntilChanged, delay, take } from 'rxjs/operators';
import { selectScreenDeviceSubstate } from '../../ngrx/selectors/screen-device.selectors';

@Component({
  selector: 'app-neat-data-title',
  templateUrl: './neat-data-title.component.html',
  styleUrls: ['./neat-data-title.component.scss']
})
export class NeatDataTitleComponent implements OnInit {
  //

  @ViewChild('titleContainer')
  titleContainer: ElementRef<HTMLDivElement>;

  @Output()
  refresh = new EventEmitter<void>();

  objid: string;
  toggleValue: IScreenDevice['layout'];
  device: IScreenDevice['device'];
  latestData$: Observable<any>;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    this.route.queryParams.subscribe(params => {
      this.objid = params.objid;
    });

    this.store
      .select(selectScreenDeviceSubstate)
      .pipe(take(1))
      .subscribe(_ => {
        this.toggleValue = _.layout;
        this.device = _.device;
        if (this.device === 'tablet') this.device = 'desktop';
      });

    this.latestData$ = combineLatest([
      interval(100).pipe(
        map(_ => (this.titleContainer ? this.titleContainer.nativeElement.offsetWidth : 100)),
        distinctUntilChanged()
      )
    ]).pipe(
      delay(10),
      map(([width]): { width: number } => {
        return {
          width
        };
      })
    );
  }

  ngOnInit() {}

  refreshScreen() {
    this.refresh.emit();
  }

  setToggleValue(e) {
    this.toggleValue = e;
    this.store.dispatch(new ScreenDeviceSetLayout({ layout: this.toggleValue }));
  }
}
