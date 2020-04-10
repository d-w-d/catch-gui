import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './components/home-page/home-page.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { SettingsPageComponent } from './components/settings-page/settings-page.component';
import { TestPageComponent } from './components/test-page/test-page.component';
import { TermsComponent } from './components/terms/terms.component';
import { ApisPageComponent } from './components/apis-page/apis-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    pathMatch: 'full'
  },
  {
    path: 'about',
    component: AboutPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'contact',
    component: ContactPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'settings',
    component: SettingsPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'terms',
    component: TermsComponent,
    pathMatch: 'full'
  },
  {
    path: 'neat',
    loadChildren: () => import('./neat-data/neat-data.module').then(m => m.NeatDataModule)
  },
  {
    path: 'apis',
    component: ApisPageComponent,
    pathMatch: 'full'
  },

  {
    path: 'test',
    component: TestPageComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
