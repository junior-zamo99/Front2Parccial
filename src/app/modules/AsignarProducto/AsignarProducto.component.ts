import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component ,OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsignarProductoAlmacenService } from './asignar-producto-almacen.service';
import { ProductService } from '../product/service/product.service';
import { AlmacenService } from '../almacen/service/almacen.service';
import { Product } from '../../interfaces/poduct.interface';
import { Almacen } from '../../interfaces/almacen.interface';

@Component({
  selector: 'app-asignar-producto',
  imports: [
    CommonModule,
    // FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './AsignarProducto.component.html',
  styleUrl: './AsignarProducto.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsignarProductoComponent implements  OnInit{
  asignarForm!: FormGroup;
  almacenes :Almacen[]=[];
  productos :Product[]=[];

  constructor(
    private fb: FormBuilder,
    private asignarProductoAlmacenService:AsignarProductoAlmacenService,
    private productoService:ProductService,
    private almacenService:AlmacenService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.asignarForm = this.fb.group({
      productoId: [null, Validators.required],
      almacenId: [null, Validators.required],
      stock: [null, [Validators.required, Validators.min(1)]]
    });

    this.productoService.getProductAll().subscribe({
      next: (productos) => {
        this.productos = productos;
        console.log('Productos cargados:', this.productos);
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
        this.cdr.markForCheck();
      },
    });

    this.almacenService.getAlmacenes().subscribe({
      next: (almacenes) => {
        this.almacenes = almacenes;
        console.log('Almacenes cargados:', this.almacenes);
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
        this.cdr.markForCheck();
      },
    });
  }

  onSubmit() {
    if (this.asignarForm.valid) {
      console.log(this.asignarForm.value);
      const data = this.asignarForm.value;
      this.asignarProductoAlmacenService.createProductoAlamacen(data).subscribe({
        next: () => {
          console.log('Producto asignado al almacén correctamente');
          alert('✅ Producto asignado al almacén correctamente.');
          this.asignarForm.reset();
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error(err);
          this.cdr.markForCheck();
        },
      });
      // Aquí iría la lógica para guardar los datos en el backend
    }
  }
 }
