import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavComponent } from './side-nav.component';
import { SharedModule } from '../../shared/shared.module';
import { FaIconComponent, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { AppModule } from '../../app.module';

@NgModule({
  imports: [FontAwesomeModule],
  declarations: [FaIconComponent],
  entryComponents: [FaIconComponent]
})
class TestModule {}

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [SidenavComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
