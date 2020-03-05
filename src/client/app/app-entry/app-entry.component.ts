import { Component, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AppState } from '../ngrx/reducers';
import { TPermittedTheme } from '../models/site-settings.model';
import { selectRouterUrl } from '../ngrx/selectors/router.selectors';
import { selectNavigationRecords } from '../ngrx/selectors/navigation.selectors';
import { NavigationCollectRouteRecords } from '../ngrx/actions/navigation.actions';
import { INeatObjectQueryStatus } from '../models/neat-object-query-result-labels.model';
import { SiteSettingsLoadAllFromLocalStorage } from '../ngrx/actions/site-settings.actions';
import { LocalStorageService } from '../core/services/local-storage/local-storage.service';
import { selectNeatObjectQueryStatus } from '../ngrx/selectors/neat-object-query.selectors';
import { selectSiteSettingsEffectiveTheme } from '../ngrx/selectors/site-settings.selectors';
import {
  footerAnimationToFromHomePageDelayMs,
  footerAnimationNotToFromHomePageDelayMs,
  defaultPageAnimationDelayMs,
  fromHomePageAnimationDelayMs,
  toHomePageAnimationDelayMs,
  pageFadeInDurationMs
} from '../../app/utils/animation-constants';

@Component({
  selector: 'app-entry-root',
  templateUrl: './app-entry.component.html',
  styleUrls: ['./app-entry.component.scss']
  // encapsulation: ViewEncapsulation.None
})
export class AppEntryComponent {
  //

  siteTheme: TPermittedTheme;
  selectedRoute = '';
  isHomePage = false;
  isAppLoaded = false;
  isFooterHidden = true;
  isRoutedPageHidden = true;
  isReadyForAnimation = false;
  neatQueryStatus: INeatObjectQueryStatus;

  constructor(
    private localStorageService: LocalStorageService,
    private store: Store<AppState>,
    private snackBar: MatSnackBar
  ) {
    this._onSiteLoad();
  }

  private _onSiteLoad() {
    // Ensure local storage is setup with default values
    this.localStorageService.verifyAndRepairLocalStorageState();

    // Load localStorage settings into ngrx store
    this.store.dispatch(new SiteSettingsLoadAllFromLocalStorage());

    // Set siteTheme
    this.store.select(selectSiteSettingsEffectiveTheme).subscribe(siteTheme => {
      this.siteTheme = siteTheme;
      // Set body color based on siteTheme value
      const isDark = siteTheme === 'DARK-THEME';
      document.body.style.backgroundColor = isDark ? '#303030' : 'white';
    });

    // Remove loader graphic
    const appLoadingDiv = document.getElementById('appLoadingDivId');
    const fadeTimeMs = 100;
    if (!!appLoadingDiv) appLoadingDiv.classList.add(`fade-out-${fadeTimeMs}`);
    setTimeout(() => {
      if (!!appLoadingDiv) appLoadingDiv.remove();
    }, fadeTimeMs);

    // Whenever the native StoreRouter dispatches an action (viz. on route updates)
    // we dispatch our own "navigation-collect-route-records" action,
    // which triggers effect 'collectNavigationRecords$'
    this.store.select(selectRouterUrl).subscribe(url => {
      if (!!url) {
        this.store.dispatch(
          new NavigationCollectRouteRecords({
            newPresentRoute: url
          })
        );
      }
    });

    // Logic to hide/show footer on route changes
    // We delay the appearance of the footer if navigating to or from homepage
    this.store.select(selectNavigationRecords).subscribe(navSubstate => {
      const isToHomePage = navSubstate.presentRoute === '/';
      const isFromHomePage = navSubstate.previousRoute === '/';

      // Control footer animation
      this.isFooterHidden = true;
      setTimeout(
        () => (this.isFooterHidden = false),
        isToHomePage || isFromHomePage
          ? footerAnimationToFromHomePageDelayMs
          : footerAnimationNotToFromHomePageDelayMs
      );

      // Control routed-page animation
      this.isRoutedPageHidden = true;
      let delayTimeMs = defaultPageAnimationDelayMs;
      if (isToHomePage) delayTimeMs = toHomePageAnimationDelayMs;
      if (isFromHomePage) delayTimeMs = fromHomePageAnimationDelayMs;
      setTimeout(() => (this.isRoutedPageHidden = false), delayTimeMs);
    });

    this.store.select(selectNeatObjectQueryStatus).subscribe(status => {
      this.neatQueryStatus = status;
      if (!!status && status.code === 'notfound') {
        // Inform user that there's a problem
        this.snackBar.open('No data found for ' + status.objid, 'Close', {
          duration: 5000
        });
      }
    });

    // Initialize app
    this.isAppLoaded = true;
  }

  openSidenav(sidenav: MatSidenav) {
    sidenav.open();
  }

  closeSidenav(sidenav: MatSidenav) {
    setTimeout(() => sidenav.close(), 250); // Add slight delay before closing
  }

  getPageAnimateStyle() {
    if (this.isRoutedPageHidden) return {};
    return { animation: `pageFadeIn ${pageFadeInDurationMs}ms ease-in-out 0ms 1 normal forwards` };
  }
}
