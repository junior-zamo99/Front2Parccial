import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Category } from '../../../interfaces/category.interface';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../service/product.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-add',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  template: `


<div class="container mt-4 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg transition-colors duration-500">
  <h2 class="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">Crear Producto</h2>

  <form [formGroup]="productForm" (ngSubmit)="createProduct()" class="space-y-4">

    <!-- Campo Nombre -->
    <div class="mb-3">
      <label for="nombre" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label>
      <input
        type="text"
        id="nombre"
        class="w-full px-4 py-2 mt-1 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        formControlName="nombre"
        placeholder="Nombre del producto"
      />
      <div *ngIf="productForm.get('nombre')?.invalid && productForm.get('nombre')?.touched" class="text-red-500 text-sm">
        El nombre es requerido (máximo 30 caracteres).
      </div>
    </div>

    <!-- Campo Precio -->
    <div class="mb-3">
      <label for="precio" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Precio</label>
      <input
        type="number"
        id="precio"
        class="w-full px-4 py-2 mt-1 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        formControlName="precio"
        placeholder="Precio del producto"
      />
      <div *ngIf="productForm.get('precio')?.invalid && productForm.get('precio')?.touched" class="text-red-500 text-sm">
        El precio debe ser mayor a 0.
      </div>
    </div>

    <!-- Campo Categoría -->
    <div class="mb-3">
      <label for="id_categoria" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Categoría</label>
      <select
        id="id_categoria"
        class="w-full px-4 py-2 mt-1 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        formControlName="id_categoria">
        <option value="" disabled selected>Seleccionar categoría</option>
        <option *ngFor="let cat of category" [value]="cat.id">{{ cat.nombre }}</option>
      </select>
      <div *ngIf="productForm.get('id_categoria')?.invalid && productForm.get('id_categoria')?.touched" class="text-red-500 text-sm">
        Selecciona una categoría.
      </div>
    </div>

    <!-- Botón para Agregar Producto -->
    <button
      type="submit"
      class="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50 transition-all duration-300"
      [disabled]="productForm.invalid"
    >
      Agregar Producto
    </button>

  </form>
</div>
`,
  styleUrl: './product-add.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductAddComponent {
  @Input() category:Category[]=[];
  productForm!: FormGroup ;

  constructor(
    private fb: FormBuilder,
    private productService:ProductService,
    private router:Router
  ){}
  ngOnInit(): void {
    this.productForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(30)]],
      precio: [0, [Validators.required,Validators.min(0),
        Validators.pattern('^[0-9]*$') ]],// Asegura que el precio sea un número entero
      id_categoria: [null, [Validators.required]] // Selección de categoría
    });
    // throw new Error('Method not implemented.');
  }

  // Método para enviar los datos del formulario
  createProduct(): void {
    if (this.productForm.valid) {
      const product = this.productForm.value;
      console.log('data para crear un producto:', product);

      this.productService.createProduct(product).subscribe(
        {
          next: (response) => {
            Swal.fire({
              icon: 'success',
              title: 'Producto creado',
              text: 'El producto se ha creado exitosamente.',
              confirmButtonText: 'OK'
            }).then(() => {
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/dashboard/product/list']); // Navega a la lista de productos
              });
            });
          },
          error: (err) => {
            console.error(err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un problema al crear el producto. Inténtalo de nuevo.',
              confirmButtonText: 'OK'
            });
          }
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }
}
