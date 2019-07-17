import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MacroMatTabellaComponent } from './macro-mat-tabella.component';

describe('MacroMatTabellaComponent', () => {
  let component: MacroMatTabellaComponent;
  let fixture: ComponentFixture<MacroMatTabellaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MacroMatTabellaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MacroMatTabellaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
