import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApisPageComponent } from './apis-page.component';

describe('ApisPageComponent', () => {
  let component: ApisPageComponent;
  let fixture: ComponentFixture<ApisPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApisPageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApisPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
