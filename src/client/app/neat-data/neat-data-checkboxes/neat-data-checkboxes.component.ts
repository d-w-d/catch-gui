import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { AppState } from '@client/app/ngrx/reducers';
import { NeatObjectQuerySetColumnState } from '@client/app/ngrx/actions/neat-object-query.actions';
import { INeatObjectQueryResultLabels } from '@client/app/models/neat-object-query-result-labels.model';
import { isMobile } from './../../utils/is-mobile';
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

  @Input()
  colNum = 2;

  subscriptions = new Subscription();
  allColNames: TColName[];
  colState: TColInitState;
  labels: INeatObjectQueryResultLabels;
  innerWidth: number;
  isMobile = isMobile;

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
  }

  ngOnInit() {}

  ngOnDestroy() {}

  updateColState(e: MatCheckboxChange, colName: TColName) {
    this.colState[colName] = e.checked;
    this.store.dispatch(new NeatObjectQuerySetColumnState({ newColState: { ...this.colState } }));
  }

  /**
   * The following getXXX methods implement fiddly logic
   * for populating the right number of checkboxes in a grid
   * based upon arbitrary grid width.
   */

  getIncrement() {
    return this.colNum;
  }

  getIterator() {
    const increment = this.getIncrement();
    const res = this.allColNames
      .map((el, ind) => ind * increment)
      .filter((el, ind, arr) => ind <= arr.length / increment);
    // console.log('iterator', res);
    return res;
  }

  getRangeArr(flooredIndex): number[] {
    let increment = this.getIncrement();
    // Reduce increment to avoid indexing past length of allColNames
    if (flooredIndex + increment > this.allColNames.length)
      increment = this.allColNames.length - flooredIndex;
    const res = Array.from({ length: increment }, (v, k) => k);
    return res;
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
