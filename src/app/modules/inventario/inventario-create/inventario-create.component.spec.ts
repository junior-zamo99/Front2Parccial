import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioCreateComponent } from './inventario-create.component';

describe('InventarioCreateComponent', () => {
  let component: InventarioCreateComponent;
  let fixture: ComponentFixture<InventarioCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventarioCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventarioCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
