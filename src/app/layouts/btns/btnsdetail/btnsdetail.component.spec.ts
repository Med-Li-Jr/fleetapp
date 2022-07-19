import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnsdetailComponent } from './btnsdetail.component';

describe('BtnsdetailComponent', () => {
  let component: BtnsdetailComponent;
  let fixture: ComponentFixture<BtnsdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnsdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnsdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
