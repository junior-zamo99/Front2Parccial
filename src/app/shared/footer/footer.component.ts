import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  pageCounter = 1;  // Contador de páginas

  constructor(private router: Router) {
    // Detectar cambios de navegación
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.pageCounter++;  // Incrementar el contador en cada navegación
      }
    });
  }
}
