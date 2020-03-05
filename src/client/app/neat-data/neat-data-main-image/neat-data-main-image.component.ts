import { Store } from '@ngrx/store';
import { AppState } from '@client/app/ngrx/reducers';
import { Component, ViewChild, ElementRef, ViewEncapsulation, Input } from '@angular/core';

import {
  selectNeatObjectQueryResults,
  selectNeatObjectQuerySelectedResultIndex
} from '@client/app/ngrx/selectors/neat-object-query.selectors';
import { combineLatest, Observable, interval } from 'rxjs';
import { map, distinctUntilChanged, delay } from 'rxjs/operators';

interface ILatestData {
  selectedResultIndex: number;
  thumbUrl: string;
  fitsUrl: string;
  width: number;
  height: number;
}

@Component({
  selector: 'app-neat-data-main-image',
  templateUrl: './neat-data-main-image.component.html',
  styleUrls: ['./neat-data-main-image.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NeatDataMainImageComponent {
  @ViewChild('imagesWrapper')
  imageWrapperDiv: ElementRef<HTMLDivElement>;

  @Input()
  objid: string;

  isFits = false;

  isButtonRaised = false;

  latestData$: Observable<ILatestData>;

  constructor(private store: Store<AppState>) {
    // todo: fix this sh***y-interval approach to checking width changes!
    this.latestData$ = combineLatest([
      interval(1000).pipe(
        map(_ => (this.imageWrapperDiv ? this.imageWrapperDiv.nativeElement.offsetWidth : 100)),
        distinctUntilChanged()
      ),
      this.store.select(selectNeatObjectQueryResults),
      this.store.select(selectNeatObjectQuerySelectedResultIndex)
    ]).pipe(
      delay(10),
      map(
        ([width, results, selectedResultIndex]): ILatestData => {
          console.log('>>>', results[selectedResultIndex].ra);
          console.log('>>>', results[selectedResultIndex].dec);
          return {
            width,
            height: width - 44 - 42,
            selectedResultIndex,
            fitsUrl: results[selectedResultIndex].cutout_url,
            thumbUrl: results[selectedResultIndex].thumbnail_url
          };
        }
      )
    );
  }

  toggleFits(event: MouseEvent) {
    // event.preventDefault();
    // event.stopPropagation();
    // console.log('event', event, typeof event);
    this.isFits = !this.isFits;
    if (!this.isFits) this.isButtonRaised = false;
  }

  raiseButton(e) {
    this.isButtonRaised = true;
  }
}
