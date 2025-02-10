import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InventarioServiceService } from '../inventario-service.service';

@Component({
  selector: 'app-inventario-create',
  imports: [CommonModule,FormsModule],
  templateUrl: './inventario-create.component.html',
  styleUrl: './inventario-create.component.css'
})
export class InventarioCreateComponent {
  availableProducts = [
    { id: 2, name: 'Producto A' },
    { id: 4, name: 'Producto B' }
  ];

  tipoAjuste = [
    { id: 'egreso', name: 'egreso' },
    { id: 'ingreso', name: 'ingreso' }
  ];

  descipcion: string = '';
  selectedProduct: string = '';
  cantidad: number | null = null;
  products: { idProductoAlmacen: number, cantidad: number }[] = [];
  tipo: string = '';

  constructor(private InventarioService:InventarioServiceService) {}

  addProduct() {
    if (this.selectedProduct && this.cantidad && this.cantidad > 0) {
      this.products.push({ idProductoAlmacen: +this.selectedProduct, cantidad: this.cantidad });
      this.selectedProduct = '';
      this.cantidad = null;
    }
  }

  handleSubmit() {
    const ajusteData = {
      fecha: new Date().toISOString().split('T')[0],
      tipo: this.tipo,
      descripcion: 'Ajuste de inventario',
      detallesAjuste: this.products
    };

    console.log('Ajuste:', ajusteData);

    this.InventarioService.crearAjuste(ajusteData).subscribe(
      (response) => {
        console.log('Ajuste creado:', response);
      },
      (error) => {
        console.log('Error:', error);
      }
    );
    
  }
}
