import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InventarioServiceService } from '../inventario-service.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inventario-index',
  imports: [CommonModule,RouterLink],
  templateUrl: './inventario-index.component.html',
  styleUrl: './inventario-index.component.css'
})
export class InventarioIndexComponent implements OnInit {
  inventoryData: any[] = [
    {
      id: 2,
      producto: {
        id: 2,
        nombre: 'Camiseta',
        descripcion: 'Camiseta de algodón de alta calidad',
        precio: 25.00,
        categoria: {
          id: 2,
          nombre: 'Ropa'
        }
      },
      almacen: {
        id: 2,
        nombre: 'Almacén Central',
        ubicacion: 'Zona Sur'
      },
      stock: 500
    },
    {
      id: 3,
      producto: {
        id: 3,
        nombre: 'Pantalón',
        descripcion: 'Pantalón de mezclilla azul',
        precio: 40.00,
        categoria: {
          id: 3,
          nombre: 'Ropa'
        }
      },
      almacen: {
        id: 1,
        nombre: 'Almacén Norte',
        ubicacion: 'Zona Norte'
      },
      stock: 300
    }
  ];

  constructor(
    private inventarioService: InventarioServiceService,
  ) {}

  ngOnInit() {
    this.inventarioService.getInventarioAll().subscribe(
      (response) => {
        console.log('Inventario:', response);
        this.inventoryData = response;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
