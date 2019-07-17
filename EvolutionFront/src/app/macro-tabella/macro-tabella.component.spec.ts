import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { MacroTabellaComponent } from './macro-tabella.component';

describe('MacroTabellaComponent', () => {
  let component: MacroTabellaComponent;
  let fixture: ComponentFixture<MacroTabellaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MacroTabellaComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MacroTabellaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
