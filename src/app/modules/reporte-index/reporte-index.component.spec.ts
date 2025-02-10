import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteIndexComponent } from './reporte-index.component';

describe('ReporteIndexComponent', () => {
  let component: ReporteIndexComponent;
  let fixture: ComponentFixture<ReporteIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
