import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeatDataPlotlyGraphComponent } from './neat-data-plotly-graph.component';

describe('NeatDataPlotlyGraphComponent', () => {
  let component: NeatDataPlotlyGraphComponent;
  let fixture: ComponentFixture<NeatDataPlotlyGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NeatDataPlotlyGraphComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeatDataPlotlyGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
