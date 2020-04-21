import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteConfigComponent } from './vote_config.component';

describe('VoteConfigComponent', () => {
  let component: VoteConfigComponent;
  let fixture: ComponentFixture<VoteConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoteConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
