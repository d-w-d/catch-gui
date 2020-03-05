import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { IPlotlyGraphInput } from '../neat-data-plotly-graph/neat-data-plotly-graph.component';

import {
  TColInitState,
  TColName
} from '@client/app/core/services/neat-data/neat-initial-data-columns.service';
import { INeatObjectQueryResult } from '@client/app/models/neat-object-query-result.model';
import {
  selectNeatObjectQueryResults,
  selectNeatObjectQueryResultLabels,
  selectNeatObjectQueryColumnState,
  selectNeatObjectQuerySelectedResultIndex
} from '@client/app/ngrx/selectors/neat-object-query.selectors';
import { AppState } from '@client/app/ngrx/reducers';
import {
  INeatObjectQueryResultLabels,
  INeatObjectQueryResultLabel
} from '@client/app/models/neat-object-query-result-labels.model';
import { NeatDataPlotlyGraphDialogComponent } from '../neat-data-plotly-graph/neat-data-plotly-graph.dialog-component';
import { NeatObjectQuerySetSelectedResultIndex } from '@client/app/ngrx/actions/neat-object-query.actions';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-neat-data-table',
  templateUrl: './neat-data-table.component.html',
  styleUrls: ['./neat-data-table.component.scss']
})
export class NeatDataTableComponent implements OnInit, OnDestroy {
  //
  // Track all subscriptions that will need removal
  subscriptions: Subscription = new Subscription();

  selectedIndex = 0;

  deltaData: undefined | number[];
  raData: undefined | number[];
  decData: undefined | number[];
  jdData: undefined | number[];
  rhData: undefined | number[];
  phaseData: undefined | number[];
  tmtpData: undefined | number[];
  trueanomalyData: undefined | number[];

  // Table Pagination Params
  pageSizeOptions = [25, 50, 100];
  private paginator: MatPaginator | undefined;
  @ViewChild(MatPaginator) set setPaginator(content: MatPaginator) {
    this.paginator = content;
    if (!!this.tableData) {
      this.tableData.paginator = this.paginator;
    }
  }
  renderedTableData: any;

  // Table Sorting Params
  private sort: MatSort | undefined;
  @ViewChild(MatSort) set setSort(content: MatSort) {
    this.sort = content;
    if (!!this.tableData) {
      this.tableData.sort = this.sort;
    }
  }

  colState: TColInitState;
  resultLabels: INeatObjectQueryResultLabels;
  shownCols: Partial<TColName>[];

  rawResults: INeatObjectQueryResult[];
  cleanedResults: INeatObjectQueryResult[];
  tableData: MatTableDataSource<INeatObjectQueryResult> | undefined;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {
    //

    // Get neat-object-query results from server
    // todo: At the moment we assume there are results in the store
    // todo: later we need to retrieve results based on objid query param

    this.store
      .select(selectNeatObjectQueryResults)
      .pipe(take(1))
      .subscribe(results => {
        this.rawResults = results;
        this.cleanedResults = [...results];
        this.processRawResults();
      });

    this.subscriptions.add(
      this.store.select(selectNeatObjectQuerySelectedResultIndex).subscribe(selectedIndex => {
        this.selectedIndex = selectedIndex;
      })
    );

    // Get resultLabels from server
    // todo: resultLabels really need to be built into app at build time!
    this.store
      .select(selectNeatObjectQueryResultLabels)
      .pipe(take(1))
      .subscribe(resultLabels => (this.resultLabels = resultLabels));

    this.subscriptions.add(
      this.store.select(selectNeatObjectQueryColumnState).subscribe(colState => {
        this.colState = colState;
        this.shownCols = Object.keys(this.colState).filter(
          (key, ind, arr) => this.colState[key]
        ) as TColName[];
      })
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  processRawResults() {
    this.raData = this.rawResults.map(el => el.ra);
    this.decData = this.rawResults.map(el => el.dec);
    this.deltaData = this.rawResults.map(el => el.delta);
    this.jdData = this.rawResults.map(el => el.jd);
    this.rhData = this.rawResults.map(el => el.rh);
    this.phaseData = this.rawResults.map(el => el.phase);
    this.tmtpData = this.rawResults.map(el => el.tmtp);
    this.trueanomalyData = this.rawResults.map(el => el.trueanomaly);

    // Hacks to fix archive_url:
    this.cleanedResults.forEach((el, ind) => {
      this.cleanedResults[ind] = {
        ...el,
        archive_url: el.archive_url.replace('fits', 'fit.fz')
      };
    });

    // Mutate each result object by adding combined 'raDec' property
    this.cleanedResults.forEach((el, ind) => {
      this.cleanedResults[ind] = { ...el, raDec: el.ra + ' / ' + el.dec };
    });

    // Determine array of page sizes
    const MAX_PAGINATION_VALUE = Math.max.apply(Math, this.pageSizeOptions);
    if (this.cleanedResults.length > MAX_PAGINATION_VALUE) {
      this.pageSizeOptions.push(this.cleanedResults.length);
    }

    // Get data in format required for MatTable
    this.tableData = new MatTableDataSource(this.cleanedResults);

    this.tableData.connect().subscribe(d => (this.renderedTableData = d));
  }

  //
  onClickPlotly(e: MouseEvent, plot: Partial<TColName>) {
    e.stopPropagation();

    // Only ra-dec plot is scatter
    const xDataKey = plot === 'raDec' ? 'ra' : plot;
    const yDataKey = plot === 'raDec' ? 'dec' : undefined;

    this.dialog.open<NeatDataPlotlyGraphDialogComponent, IPlotlyGraphInput>(
      NeatDataPlotlyGraphDialogComponent,
      { data: { xDataKey, yDataKey } }
    );
  }

  getAllCols() {
    return ['thumbnail_url', ...this.shownCols];
  }

  formatCellEntry(entry: any, labels: INeatObjectQueryResultLabel) {
    //
    // console.log('entry', entry);
    // console.log('labels', labels);
    //

    if (typeof entry === 'number') return entry.toFixed(labels.fractionSize);
    // Parse raDec, toFix, reassemble
    if (entry.includes('/')) {
      //
      // console.log('labels.fractionSize', this.resultLabels);
      //
      const [ra, dec] = entry
        .split('/')
        .map((el: string) => parseFloat(el.trim()).toFixed(labels.fractionSize));
      return ra + ' / ' + dec;
    }
    return entry;
  }

  selectRow(index: number) {
    this.store.dispatch(new NeatObjectQuerySetSelectedResultIndex({ index }));
  }
}
