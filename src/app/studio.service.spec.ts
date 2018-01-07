import { TestBed, inject } from '@angular/core/testing';

import { StudioService } from './studio.service';

describe('StudioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudioService]
    });
  });

  it('should ...', inject([StudioService], (service: StudioService) => {
    expect(service).toBeTruthy();
  }));
});
