import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeatDataTitleComponent } from './neat-data-title.component';

describe('NeatDataTitleComponent', () => {
  let component: NeatDataTitleComponent;
  let fixture: ComponentFixture<NeatDataTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NeatDataTitleComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeatDataTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
