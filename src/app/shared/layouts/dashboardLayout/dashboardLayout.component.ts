import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../../app.routes';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { Rol } from '../../../interfaces/rol.interface';
import { Router } from '@angular/router';
import { Permiso } from '../../../interfaces/permiso.interface';
import { User } from '../../../interfaces/user.interface';
// import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard-layout',
  imports: [
    CommonModule,
    RouterModule,
    SidebarComponent
],
  templateUrl: './dashboardLayout.component.html',
  styleUrl: './dashboardLayout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLayoutComponent  implements OnInit {
  isDarkMode = false;

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    const body = document.body;

    if (this.isDarkMode) {
      body.classList.add('dark');  // Activa el modo oscuro
      localStorage.setItem('theme', 'dark');  // Guarda la preferencia en el almacenamiento local
    } else {
      body.classList.remove('dark');  // Vuelve al modo claro
      localStorage.setItem('theme', 'light');  // Guarda la preferencia en el almacenamiento local
    }
  }
  public userPermissions: Permiso[] = [];
  user:User | undefined;

  constructor(private router: Router) {}
  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode = true;
      document.body.classList.add('dark');
    }
  
    // Recuperar permisos desde sessionStorage
    const permissions = JSON.parse(sessionStorage.getItem('roles') || '[]');
    const user = JSON.parse(sessionStorage.getItem('user') || '[]');
    this.user = user;
    this.userPermissions = permissions.flatMap((rol: Rol) => rol.permisos);
    console.log('Permisos del usuario:', this.userPermissions);
  }
  public routes = routes[1].children?.filter( (route) => route.data );

  hasPermission(permissionName: string): boolean {
    // Verificamos si el usuario tiene el permiso adecuado en cualquiera de sus roles
    return this.userPermissions.some(perm => perm.nombre_Permiso === permissionName);
  }
  // Método para cerrar sesión
  logout() {
    // Eliminar el usuario y el token (o cualquier dato relacionado con la autenticación)
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('roles');
    sessionStorage.removeItem('token');
    // Redirigir al usuario a la página de login
    this.router.navigate(['/']);
  }

}
