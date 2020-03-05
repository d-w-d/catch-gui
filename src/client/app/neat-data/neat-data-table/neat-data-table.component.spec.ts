import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeatDataTableComponent } from './neat-data-table.component';

describe('NeatDataTableComponent', () => {
  let component: NeatDataTableComponent;
  let fixture: ComponentFixture<NeatDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NeatDataTableComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeatDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
