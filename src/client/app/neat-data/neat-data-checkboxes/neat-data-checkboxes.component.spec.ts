import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeatDataCheckboxesComponent } from './neat-data-checkboxes.component';

describe('NeatDataCheckboxesComponent', () => {
  let component: NeatDataCheckboxesComponent;
  let fixture: ComponentFixture<NeatDataCheckboxesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NeatDataCheckboxesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeatDataCheckboxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
