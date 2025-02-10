import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reporte-index',
  imports: [    FormsModule,
      ReactiveFormsModule, // Asegúrate de incluir esto
      CommonModule],
  templateUrl: './reporte-index.component.html',
  styleUrl: './reporte-index.component.css'
})
export class ReporteIndexComponent implements OnInit{

  reporteForm!: FormGroup;  // Inicialización vacía
  errorMessage: string = ''; // Para manejar los errores

  constructor(
    private fb: FormBuilder, // Inyectar el FormBuilder
    // Inyectar el servicio de cliente
    private router: Router // Inyectar el router
  ) {}

  ngOnInit(): void {
    // Definir el formulario con sus campos y validaciones
    this.reporteForm = this.fb.group({
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      tipo: ['', Validators.required],
    });
  }

   // Método para crear un cliente
   onSubmit(): void {
      console.log('Formulario:', this.reporteForm.value); // Verificar la data enviada
  }

 

 }

