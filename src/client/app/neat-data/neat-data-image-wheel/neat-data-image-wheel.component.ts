import { Component, OnInit, OnDestroy, Input, ElementRef, ViewChild } from '@angular/core';
import { AppState } from '@client/app/ngrx/reducers';
import { Store } from '@ngrx/store';
import {
  selectNeatObjectQueryResults,
  selectNeatObjectQuerySelectedResultIndex
} from '@client/app/ngrx/selectors/neat-object-query.selectors';
import { INeatObjectQueryResult } from '@client/app/models/neat-object-query-result.model';
import { take, map, distinctUntilChanged, delay } from 'rxjs/operators';
import { Observable, Subscription, combineLatest, interval } from 'rxjs';
import { NeatObjectQuerySetSelectedResultIndex } from '@client/app/ngrx/actions/neat-object-query.actions';

@Component({
  selector: 'app-neat-data-image-wheel',
  templateUrl: './neat-data-image-wheel.component.html',
  styleUrls: ['./neat-data-image-wheel.component.scss']
})
export class NeatDataImageWheelComponent implements OnInit, OnDestroy {
  //

  @ViewChild('imageWheelContainer')
  imageWheelContainerDiv: ElementRef<HTMLDivElement>;

  @Input()
  isVertical = false;

  // @Input()
  // size = '100px';

  results: INeatObjectQueryResult[];
  selectedResultIndex: number;
  subscriptions = new Subscription();
  width: string;
  height: string;

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

    this.subscriptions.add(
      combineLatest([
        interval(1000).pipe(
          map(_ =>
            this.imageWheelContainerDiv
              ? this.imageWheelContainerDiv.nativeElement.clientWidth
              : 100
          ),
          distinctUntilChanged()
        ),
        interval(1000).pipe(
          map(_ =>
            this.imageWheelContainerDiv
              ? this.imageWheelContainerDiv.nativeElement.clientHeight
              : 100
          ),
          distinctUntilChanged()
        )
      ])
        .pipe(
          delay(10),
          map(([width, height]): { width: number; height: number } => {
            return {
              width,
              height
            };
          })
        )
        .subscribe(({ width, height }) => {
          this.width = width + 'px';
          this.height = height + 'px';
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
      width: this.isVertical ? this.width : this.height,
      height: this.isVertical ? this.width : this.height,
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
