import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  selectSiteSettingsIsHappyWithCookies,
  selectSiteSettingsHour
} from '../../ngrx/selectors/site-settings.selectors';
import { SiteSettingsSetIsHappyWithCookies } from '../../ngrx/actions/site-settings.actions';
import { AppState } from '@client/app/ngrx/reducers';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  // lastUpdated = environment.lastUpdated.replace('this-exact-moment', 'Tue Nov 5 15:21:26 EST 2019');

  lastUpdated = '';

  timeStamp = ' ' + new Date().getFullYear();

  // sbnLogo = 'assets/images/pngs/bw_sbn_logo_v1.png';
  // sbnLogo = 'assets/images/pngs/sbn_logo4_v0.png';
  sbnLogo = 'assets/images/pngs/sbn_logo5_v0.png';

  isHappyWithCookie$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.isHappyWithCookie$ = this.store.select(selectSiteSettingsIsHappyWithCookies);

    // this.store.select(selectSiteSettingsIsAutoNightMode).subscribe(_ => {
    //   console.log('----', _);
    // });

    // this.store.select(selectSiteSettingsEffectiveTheme).subscribe(_ => {
    //   console.log('----', _);
    // });

    // this.store.select(selectSiteSettingsIsNightHour).subscribe(_ => {
    //   console.log('----', _);
    // });

    this.store.select(selectSiteSettingsHour).subscribe(_ => {
      // console.log('----', _);
    });
  }

  ngOnInit() {}

  acceptTerms(e: any) {
    console.log('????');
    this.store.dispatch(new SiteSettingsSetIsHappyWithCookies({ isHappyWithCookies: true }));
  }
}
