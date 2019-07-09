import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MacrosettimanaliComponent } from './macrosettimanali.component';

describe('MacrosettimanaliComponent', () => {
  let component: MacrosettimanaliComponent;
  let fixture: ComponentFixture<MacrosettimanaliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MacrosettimanaliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MacrosettimanaliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
