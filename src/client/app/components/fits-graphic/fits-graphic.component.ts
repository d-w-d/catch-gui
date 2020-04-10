import { Subscription, Observable, combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  Component,
  ViewEncapsulation,
  OnDestroy,
  ViewChild,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';
import DmsCoordinates from 'dms-conversion';

import { selectSiteSettingsTheme } from '@client/app/ngrx/selectors/site-settings.selectors';
import { TPermittedTheme } from '@client/app/models/site-settings.model';
import { simpleUid } from '@client/app/utils/simple-uid';
import { AppState } from '@client/app/ngrx/reducers';
import { sleep } from '@client/app/utils/sleep';
import {
  selectNeatObjectQueryResults,
  selectNeatObjectQuerySelectedResultIndex
} from '@client/app/ngrx/selectors/neat-object-query.selectors';
import { map } from 'rxjs/operators';
import { INeatObjectQueryResult } from '@client/app/models/neat-object-query-result.model';
import { degToHms } from '@client/app/utils/degToHms';

declare const JS9: any;
declare const $: JQueryStatic;

@Component({
  selector: 'app-fits-graphic',
  templateUrl: './fits-graphic.component.html',
  styleUrls: ['./fits-graphic.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FitsGraphicComponent implements OnDestroy, OnChanges {
  @ViewChild('js9MenubarRef')
  js9MenubarDiv: ElementRef<HTMLDivElement>;

  @ViewChild('js9MainRef')
  js9MainDiv: ElementRef<HTMLDivElement>;

  @ViewChild('js9ColorbarRef')
  js9ColorbarDiv: ElementRef<HTMLDivElement>;

  @Input()
  width: number;

  @Input()
  height: number;

  @Input()
  fitsUrl = '';

  @Output()
  isFitsLoaded: EventEmitter<boolean> = new EventEmitter();

  isShown;
  uid: string = simpleUid();
  siteTheme: TPermittedTheme;
  subscriptions = new Subscription();
  selectedResult: INeatObjectQueryResult;

  // Immutable case-sensitive required class names for transforming JS9 elements
  readonly js9MenubarClassName = 'JS9Menubar';
  readonly js9MainClassName = 'JS9';
  readonly js9ColorbarClassName = 'JS9Colorbar';

  constructor(private store: Store<AppState>) {
    this.subscriptions.add(
      this.store.select(selectSiteSettingsTheme).subscribe(theme => (this.siteTheme = theme))
    );

    this.subscriptions.add(
      combineLatest([
        this.store.select(selectNeatObjectQueryResults),
        this.store.select(selectNeatObjectQuerySelectedResultIndex)
      ])
        .pipe(
          map(
            ([results, selectedResultIndex]): INeatObjectQueryResult => {
              return results[selectedResultIndex];
            }
          )
        )
        .subscribe(selectedResult => (this.selectedResult = selectedResult))
    );

    this.resetJS9Display = this.resetJS9Display.bind(this);
    this.adjustColorbarColoring = this.adjustColorbarColoring.bind(this);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      //
      !!changes &&
      !!this.fitsUrl &&
      !!this.width &&
      !!this.height &&
      true
    ) {
      JS9.CloseImage(); // See here: https://github.com/ericmandel/js9/issues/60#issuecomment-506104711
      /**
       * When changes are made to input fitsUrl or width or height we crudely
       * unmount-then-mount the entire component using sequential
       * setTimeouts to toggle an ngIf as the easiest way to reset
       * the divs that JS9 needs to act on from the convoluted
       * structure that JS9 may have wrought previously by so-acting.
       */
      this.isShown = false;
      setTimeout(() => {
        this.isShown = true;
        setTimeout(() => this.resetJS9Display(), 10);
      }, 10);
    }
  }

  ngOnDestroy(): void {
    JS9.CloseImage();
    this.subscriptions.unsubscribe();
  }

  adjustColorbarColoring() {
    // Logic to invert the color-scale color (for sake of theme color)
    if (this.siteTheme.includes('DARK')) {
      const canvases: HTMLCanvasElement[] = document.getElementsByClassName(
        'JS9ColorbarTextCanvas'
      ) as any;
      try {
        const canvas = canvases[0];
        const ctx = !!canvas ? canvas.getContext('2d') : null;
        if (!!ctx) {
          ctx.globalCompositeOperation = 'difference';
          ctx.fillStyle = 'rgba(0,0,0,0)';
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          canvas.style.backgroundColor = 'rgba(0,0,0,0)';
        } else {
          throw new Error('This logic sucks!');
        }
      } catch (err) {
        console.log('CANVAS NOT FOUND');
      }
    }
  }

  /**
   * The ids of the three JS9 divs have to be related in specific way
   * This method ensures those relations are set out in just one place
   */
  getDivId(div: 'MENUBAR' | 'MAIN' | 'COLORBAR') {
    switch (div) {
      case 'MENUBAR':
        return this.uid + 'Menubar';
      case 'MAIN':
        return this.uid;
      case 'COLORBAR':
        return this.uid + 'Colorbar';
      default:
        throw new Error('You must match case');
    }
  }

  async resetJS9Display() {
    return new Promise(resolve => {
      // Begin JS9 load sequence
      setTimeout(async () => {
        // Reset JS9 divs
        JS9.displays = [];

        // Add divs; this seems to be synchronous
        JS9.AddDivs(this.getDivId('MAIN'));

        // Now that JS9 'Main', Menu & Colorbar divs are loaded
        // we manually hide unwanted items in the menu bar
        // Forced to load JQuery, so might as well use it here
        const menubarDivId = this.getDivId('MENUBAR');
        $('#wcsMenu' + menubarDivId).css({ display: 'none' });
        $('#fileMenu' + menubarDivId).css({ display: 'none' });
        $('#editMenu' + menubarDivId).css({ display: 'none' });
        $('#helpMenu' + menubarDivId).css({ display: 'none' });
        $('#viewMacMenu' + menubarDivId).css({ display: 'none' });
        $('#analysisMenu' + menubarDivId).css({ display: 'none' });

        // Don't let the menu buttons wrap
        $('#JS9Menus_' + menubarDivId).css({ whiteSpace: 'nowrap', overflow: 'hidden' });

        // You need to adjust color-scale coloring BEFORE loading FITS image
        this.adjustColorbarColoring();

        // Load external fits file to our div
        JS9.Load(
          this.fitsUrl,
          {
            scale: 'linear',
            colormap: 'cool',
            onload: () => {
              setTimeout(() => {
                // JS9.SetZoom('toFit', { display: this.uid });
                JS9.SetZoom(1, { display: this.uid });
                JS9.SetScale('zscale');

                // Draw Ellipse
                const ra = this.selectedResult.ra;
                const dec = this.selectedResult.dec;
                const UNC_A = this.selectedResult.unc_a * 1;
                const UNC_B = this.selectedResult.unc_b * 1;
                const UNC_THETA = this.selectedResult.unc_theta;

                const [ra4, dec4] = degToHms(ra, dec);
                const js9DrawEllipseCmd =
                  `ellipse(${ra4}, ${dec4}, ${UNC_A}", ${UNC_B}", ${UNC_THETA})` +
                  ` {"color": "violet"}`;
                JS9.AddRegions(js9DrawEllipseCmd, {
                  changeable: false
                });

                this.isFitsLoaded.emit(true);
                resolve();
              }, 0);
            },
            onerror: err => {
              console.log('err: ', err);
            }
          },
          { display: this.uid }
        );
      }, 0);
    });
  }

  getHeight() {
    const menuPlusColorBarHeight = 44 + 42;
    const result = this.height ? this.height - menuPlusColorBarHeight + 'px' : '100px';
    return result;
  }
}
