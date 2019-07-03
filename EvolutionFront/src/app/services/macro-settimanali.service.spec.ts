import { TestBed } from '@angular/core/testing';

import { MacroSettimanaliService } from './macro-settimanali.service';

describe('MacroSettimanaliService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MacroSettimanaliService = TestBed.get(MacroSettimanaliService);
    expect(service).toBeTruthy();
  });
});
