import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MacroSettimanaliComponent } from './macro-settimanali.component';

describe('MacroSettimanaliComponent', () => {
  let component: MacroSettimanaliComponent;
  let fixture: ComponentFixture<MacroSettimanaliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MacroSettimanaliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MacroSettimanaliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
