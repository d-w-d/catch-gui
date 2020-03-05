import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../ngrx/reducers';
import { TPermittedTheme, permittedThemes } from '../../models/site-settings.model';
import {
  SiteSettingsSetSiteTheme,
  SiteSettingsSetIsAutoNightMode
} from '../../ngrx/actions/site-settings.actions';
import {
  selectSiteSettingsTheme,
  selectSiteSettingsIsAutoNightMode
} from '@client/app/ngrx/selectors/site-settings.selectors';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {
  routeAnimationsElements = '';
  selectedSiteTheme: TPermittedTheme;
  permittedThemes: TPermittedTheme[];
  isAutoNightMode = false;

  constructor(private store: Store<AppState>) {
    this.store.select(selectSiteSettingsTheme).subscribe(siteTheme => {
      this.selectedSiteTheme = siteTheme;
      this.permittedThemes = siteTheme.includes('DARK')
        ? permittedThemes
        : permittedThemes.reverse();
    });

    this.store
      .select(selectSiteSettingsIsAutoNightMode)
      .subscribe(isAutoNightMode => (this.isAutoNightMode = isAutoNightMode));
  }

  ngOnInit() {}

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
