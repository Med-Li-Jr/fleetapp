import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailVignetteComponent } from './detail-vignette.component';

describe('DetailVignetteComponent', () => {
  let component: DetailVignetteComponent;
  let fixture: ComponentFixture<DetailVignetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailVignetteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailVignetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
