import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataresetComponent } from './datareset.component';

describe('DataresetComponent', () => {
  let component: DataresetComponent;
  let fixture: ComponentFixture<DataresetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataresetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataresetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
