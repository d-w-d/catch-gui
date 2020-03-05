import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeatDataMainImageComponent } from './neat-data-main-image.component';

describe('NeatDataMainImageComponent', () => {
  let component: NeatDataMainImageComponent;
  let fixture: ComponentFixture<NeatDataMainImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NeatDataMainImageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeatDataMainImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
