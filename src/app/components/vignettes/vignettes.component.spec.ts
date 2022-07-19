import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VignettesComponent } from './vignettes.component';

describe('VignettesComponent', () => {
  let component: VignettesComponent;
  let fixture: ComponentFixture<VignettesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VignettesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VignettesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
