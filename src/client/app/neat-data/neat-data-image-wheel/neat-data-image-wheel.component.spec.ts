import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeatDataImageWheelComponent } from './neat-data-image-wheel.component';

describe('NeatDataImageWheelComponent', () => {
  let component: NeatDataImageWheelComponent;
  let fixture: ComponentFixture<NeatDataImageWheelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NeatDataImageWheelComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeatDataImageWheelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
