import { TestBed } from '@angular/core/testing';
import { RsvpService } from './rsvp.service';
import { LoggerService } from './logger.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

describe('RsvpService', () => {
  let service: RsvpService;
  let firestoreMock: any;

  beforeEach(() => {
    firestoreMock = {
      collection: jasmine.createSpy('collection').and.returnValue({
        doc: jasmine.createSpy('doc').and.returnValue({
          set: jasmine.createSpy('set')
        }),
        valueChanges: jasmine.createSpy('valueChanges')
      })
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFirestore, useValue: firestoreMock },
        LoggerService
      ]
    });

    service = TestBed.inject(RsvpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
