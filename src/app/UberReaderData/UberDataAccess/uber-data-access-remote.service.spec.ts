/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UberDataAccessRemoteService } from './uber-data-access-remote.service';

describe('Service: UberDataAccessRemote', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UberDataAccessRemoteService]
    });
  });

  it('should ...', inject([UberDataAccessRemoteService], (service: UberDataAccessRemoteService) => {
    expect(service).toBeTruthy();
  }));
});
