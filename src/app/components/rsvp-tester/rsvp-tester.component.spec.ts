import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RsvpTesterComponent } from './rsvp-tester.component';

describe('RsvpTesterComponent', () => {
  let component: RsvpTesterComponent;
  let fixture: ComponentFixture<RsvpTesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RsvpTesterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RsvpTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
