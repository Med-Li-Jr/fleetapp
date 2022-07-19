import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnstableComponent } from './btnstable.component';

describe('BtnstableComponent', () => {
  let component: BtnstableComponent;
  let fixture: ComponentFixture<BtnstableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnstableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnstableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
