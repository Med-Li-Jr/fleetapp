import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtncreateComponent } from './btncreate.component';

describe('BtncreateComponent', () => {
  let component: BtncreateComponent;
  let fixture: ComponentFixture<BtncreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtncreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtncreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
