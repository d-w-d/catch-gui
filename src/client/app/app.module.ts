// Ng stuff
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modules
import { AppRoutingModule } from './routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';

// Components
import { AboutPageComponent } from './components/about-page/about-page.component';
import { AppEntryComponent } from './app-entry/app-entry.component';
import { BackgroundGraphicComponent } from './components/background-graphic/background-graphic.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { GenericDialogComponent } from './components/generic-dialog/generic-dialog.component';
import { HeaderComponent } from './components/header/header.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SidenavComponent } from './components/side-nav/side-nav.component';
import { SearchFieldComponent } from './components/search-field/search-field.component';
import { SettingsPageComponent } from './components/settings-page/settings-page.component';
import { TestPageComponent } from './components/test-page/test-page.component';

// Ngrx stuff
import { reducers, metaReducers } from './ngrx/reducers';
import { SiteSettingsEffects } from './ngrx/effects/site-settings-effects/site-settings.effects';
import { NavigationEffects } from './ngrx/effects/navigation-effects/navigation.effects';
import { ObjectNameMatchEffects } from './ngrx/effects/object-name-match-effects/object-name-match.effects';
import { NeatObjectQueryEffects } from './ngrx/effects/neat-object-query-effects/neat-object-query.effects';
import { ScreenDeviceEffects } from './ngrx/effects/screen-device-effects/screen-device.effects';

// Services
import { NeatObjectQueryService } from './core/services/neat-data/neat-object-query.service';
import { NeatObjectQueryMockService } from './core/services/neat-data/neat-object-query-mock.service';

// Misc
import { environment } from '../environments/environment';
import { HmrModule, stateSetter } from './hmr.module';
import { ObjectNameMatchService } from './core/services/object-name-match/object-name-match.service';
import { ObjectNameMatchMockService } from './core/services/object-name-match/object-name-match-mock.service';
import { TermsComponent } from './components/terms/terms.component';
import { ApisPageComponent } from './components/apis-page/apis-page.component';

const isMockDataUsed = true;
@NgModule({
  declarations: [
    AboutPageComponent,
    AppEntryComponent,
    BackgroundGraphicComponent,
    ContactPageComponent,
    FooterComponent,
    HeaderComponent,
    HomePageComponent,
    SearchFieldComponent,
    SettingsPageComponent,
    SidenavComponent,
    TestPageComponent,
    GenericDialogComponent,
    TermsComponent,
    ApisPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    CoreModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    //
    // ngrx
    EffectsModule.forRoot([
      SiteSettingsEffects,
      NavigationEffects,
      ObjectNameMatchEffects,
      NeatObjectQueryEffects,
      ScreenDeviceEffects
    ]),
    StoreModule.forRoot(reducers, { metaReducers: [stateSetter] }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    //
    // Dispatch actions on routing events
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' })
  ],
  providers: [
    {
      provide: NeatObjectQueryService,
      useClass:
        !isMockDataUsed || !!environment.production
          ? NeatObjectQueryService
          : NeatObjectQueryMockService
    },
    {
      provide: ObjectNameMatchService,
      useClass:
        !isMockDataUsed || !!environment.production
          ? ObjectNameMatchService
          : ObjectNameMatchMockService
    }
  ],
  bootstrap: [AppEntryComponent]
})
export class AppModule extends HmrModule {}
