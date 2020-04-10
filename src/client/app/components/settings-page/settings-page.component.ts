import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../ngrx/reducers';
import { TPermittedTheme, permittedThemes } from '../../models/site-settings.model';
import {
  SiteSettingsSetSiteTheme,
  SiteSettingsSetIsAutoNightMode
} from '../../ngrx/actions/site-settings.actions';
import {
  selectSiteSettingsIsAutoNightMode,
  selectSiteSettingsEffectiveTheme
} from '@client/app/ngrx/selectors/site-settings.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  routeAnimationsElements = '';
  selectedSiteTheme: TPermittedTheme;
  permittedThemes: TPermittedTheme[];
  isAutoNightMode = false;

  constructor(private store: Store<AppState>) {
    this.subscriptions.add(
      this.store.select(selectSiteSettingsEffectiveTheme).subscribe(siteTheme => {
        this.selectedSiteTheme = siteTheme;
        this.permittedThemes = siteTheme.includes('DARK')
          ? permittedThemes
          : permittedThemes.reverse();
      })
    );

    this.subscriptions.add(
      this.store
        .select(selectSiteSettingsIsAutoNightMode)
        .subscribe(isAutoNightMode => (this.isAutoNightMode = isAutoNightMode))
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onThemeSelect(choice: any) {
    this.store.dispatch(new SiteSettingsSetSiteTheme({ theme: choice.value }));
  }

  getIconStyle() {
    const style = { color: this.selectedSiteTheme === 'DARK-THEME' ? 'white' : 'black' };
    return style;
  }

  onAutoNightModeToggle(event: MatSlideToggleChange) {
    this.store.dispatch(new SiteSettingsSetIsAutoNightMode({ isAutoNightMode: event.checked }));
  }
}
