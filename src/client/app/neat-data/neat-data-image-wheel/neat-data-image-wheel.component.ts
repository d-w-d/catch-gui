import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AppState } from '@client/app/ngrx/reducers';
import { Store } from '@ngrx/store';
import {
  selectNeatObjectQueryResults,
  selectNeatObjectQuerySelectedResultIndex
} from '@client/app/ngrx/selectors/neat-object-query.selectors';
import { INeatObjectQueryResult } from '@client/app/models/neat-object-query-result.model';
import { take } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { NeatObjectQuerySetSelectedResultIndex } from '@client/app/ngrx/actions/neat-object-query.actions';

@Component({
  selector: 'app-neat-data-image-wheel',
  templateUrl: './neat-data-image-wheel.component.html',
  styleUrls: ['./neat-data-image-wheel.component.scss']
})
export class NeatDataImageWheelComponent implements OnInit, OnDestroy {
  //

  @Input()
  isVertical = false;

  @Input()
  size = '100px';

  results: INeatObjectQueryResult[];
  selectedResultIndex: number;
  subscriptions = new Subscription();

  constructor(private store: Store<AppState>) {
    this.store
      .select(selectNeatObjectQueryResults)
      .pipe(take(1))
      .subscribe(results => {
        this.results = results;
      });
    this.subscriptions.add(
      this.store.select(selectNeatObjectQuerySelectedResultIndex).subscribe(selectedResultIndex => {
        this.selectedResultIndex = selectedResultIndex;
      })
    );
  }

  ngOnInit() {}
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getImageUrls() {
    if (!this.results) return [];
    const imageUrls = this.results.map(el => el.thumbnail_url);
    return imageUrls;
  }

  getStyleObject(url: string, index: number) {
    const styleObject: Partial<CSSStyleDeclaration> = {
      backgroundImage: `url(${url})`,
      width: this.size,
      height: this.size,
      marginBottom: '5px'
    };
    // if (index === this.selectedResultIndex) {
    //   styleObject.border = 'solid 2px red';
    // }
    return styleObject;
  }

  setSelectedIndex(index: number) {
    this.store.dispatch(new NeatObjectQuerySetSelectedResultIndex({ index }));
  }
}
