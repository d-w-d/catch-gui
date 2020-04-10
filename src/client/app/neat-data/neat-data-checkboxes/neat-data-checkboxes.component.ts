import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Subscription, combineLatest, interval, Observable } from 'rxjs';
import { take, map, distinctUntilChanged, delay } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AppState } from '@client/app/ngrx/reducers';
import { NeatObjectQuerySetColumnState } from '@client/app/ngrx/actions/neat-object-query.actions';
import { INeatObjectQueryResultLabels } from '@client/app/models/neat-object-query-result-labels.model';
import {
  selectNeatObjectQueryColumnState,
  selectNeatObjectQueryResultLabels
} from '@client/app/ngrx/selectors/neat-object-query.selectors';
import {
  NeatInitialDataColumnsService,
  TColName,
  TColInitState,
  initialColumnState
} from '@client/app/core/services/neat-data/neat-initial-data-columns.service';

@Component({
  selector: 'app-neat-data-checkboxes',
  templateUrl: './neat-data-checkboxes.component.html',
  styleUrls: ['./neat-data-checkboxes.component.scss']
})
export class NeatDataCheckboxesComponent implements OnInit, OnDestroy {
  //

  @ViewChild('checkboxesContainer')
  checkboxesContainer: ElementRef<HTMLDivElement>;

  subscriptions = new Subscription();
  allColNames: TColName[];
  colState: TColInitState;
  labels: INeatObjectQueryResultLabels;
  latestData$: Observable<{ width: number }>;

  constructor(
    private neatInitColsService: NeatInitialDataColumnsService,
    private store: Store<AppState>
  ) {
    this.allColNames = this.neatInitColsService.getOrderedColNames();

    this.subscriptions.add(
      this.store.select(selectNeatObjectQueryColumnState).subscribe(colState => {
        this.colState = colState;
      })
    );

    this.subscriptions.add(
      this.store
        .select(selectNeatObjectQueryResultLabels)
        .pipe(take(1))
        .subscribe(labels => (this.labels = labels))
    );

    this.latestData$ = combineLatest([
      interval(500).pipe(
        map(_ =>
          this.checkboxesContainer ? this.checkboxesContainer.nativeElement.offsetWidth : 100
        ),
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

  ngOnDestroy() {}

  updateColState(e: MatCheckboxChange, colName: TColName) {
    this.colState[colName] = e.checked;
    this.store.dispatch(new NeatObjectQuerySetColumnState({ newColState: { ...this.colState } }));
  }

  selectAll() {
    Object.keys(this.colState).forEach(key => {
      this.colState[key] = true;
    });
    this.store.dispatch(new NeatObjectQuerySetColumnState({ newColState: { ...this.colState } }));
  }

  resetAll() {
    this.store.dispatch(
      new NeatObjectQuerySetColumnState({ newColState: { ...initialColumnState } })
    );
  }
}
