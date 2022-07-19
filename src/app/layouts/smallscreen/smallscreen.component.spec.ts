import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallscreenComponent } from './smallscreen.component';

describe('SmallscreenComponent', () => {
  let component: SmallscreenComponent;
  let fixture: ComponentFixture<SmallscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallscreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
