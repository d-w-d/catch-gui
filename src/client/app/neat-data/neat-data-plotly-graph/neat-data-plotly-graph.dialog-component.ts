import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPlotlyGraphInput } from './neat-data-plotly-graph.component';

@Component({
  selector: 'app-neat-data-plotly-graph-dialog',
  template: `
    <app-neat-data-plotly-graph [inputPlotlyParams]="inputPlotlyParams">
    </app-neat-data-plotly-graph>
  `,
  styles: [``]
})
export class NeatDataPlotlyGraphDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public inputPlotlyParams: IPlotlyGraphInput
  ) {}

  ngOnInit() {}
}
