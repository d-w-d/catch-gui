import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { PlotlyModule } from 'angular-plotly.js';
import * as Plotly from 'plotly.js/dist/plotly.js';
PlotlyModule.plotlyjs = Plotly;

import { NeatDataPageComponent } from './neat-data-page.component';
import { NeatDataTitleComponent } from './neat-data-title/neat-data-title.component';
import { NeatDataMainImageComponent } from './neat-data-main-image/neat-data-main-image.component';
import { NeatDataImageWheelComponent } from './neat-data-image-wheel/neat-data-image-wheel.component';
import { NeatDataCheckboxesComponent } from './neat-data-checkboxes/neat-data-checkboxes.component';
import { NeatDataTableComponent } from './neat-data-table/neat-data-table.component';
import { NeatDataPlotlyGraphDialogComponent } from './neat-data-plotly-graph/neat-data-plotly-graph.dialog-component';
import { NeatDataPlotlyGraphComponent } from './neat-data-plotly-graph/neat-data-plotly-graph.component';
import { FitsGraphicComponent } from '../components/fits-graphic/fits-graphic.component';

export const LAZY_ROUTES: Routes = [
  {
    path: '',
    component: NeatDataPageComponent
  }
];

@NgModule({
  declarations: [
    NeatDataPageComponent,
    NeatDataPlotlyGraphComponent,
    NeatDataPlotlyGraphDialogComponent,
    NeatDataTitleComponent,
    NeatDataMainImageComponent,
    NeatDataImageWheelComponent,
    NeatDataCheckboxesComponent,
    NeatDataTableComponent,
    FitsGraphicComponent
  ],
  imports: [
    CommonModule,
    PlotlyModule,
    RouterModule.forChild(LAZY_ROUTES),
    SharedModule,
    CoreModule
  ],
  providers: []
})
export class NeatDataModule {}
