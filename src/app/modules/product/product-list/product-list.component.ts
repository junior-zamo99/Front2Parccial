import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { Product } from '../../../interfaces/poduct.interface';
import { ProductService } from '../service/product.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-product-list',
  imports: [
    CommonModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  @Input() public products: Product[] = [];

  constructor(
    private productService:ProductService,
    private cdr: ChangeDetectorRef
  ){}

  deleteProduct(product_id:number):void{
    this.productService.deleteProduct(product_id).subscribe(
      {
        next: () => {
          Swal.fire({
            icon: 'success',
            title: '¡Eliminado!',
            text: 'El producto ha sido eliminado exitosamente.',
            confirmButtonText: 'OK',
          }).then(() => {
            // Recargar la lista de productos
            this.reloadProducts();
          });
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error(err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al eliminar el producto. Inténtalo de nuevo.',
            confirmButtonText: 'Entendido',
          });
          this.cdr.markForCheck();
        }
      }
    );
  }

  reloadProducts(): void {
    this.productService.getProductAll().subscribe({
      next: (products) => {
        this.products = products; // Actualiza la lista de productos
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
        this.cdr.markForCheck();
      }
    });
  }

  agregarProducto(){

  }
}
