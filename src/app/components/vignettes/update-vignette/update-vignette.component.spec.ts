import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVignetteComponent } from './update-vignette.component';

describe('UpdateVignetteComponent', () => {
  let component: UpdateVignetteComponent;
  let fixture: ComponentFixture<UpdateVignetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateVignetteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateVignetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
