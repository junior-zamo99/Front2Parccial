import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthComponent } from "./modules/auth/auth.component";
import LoginComponent  from "./modules/auth/login/login.component";
import { SidebarComponent } from "./shared/components/sidebar/sidebar.component";
import { FooterComponent } from './shared/footer/footer.component';


@Component({
  selector: 'app-root',
  imports: [
    CommonModule, RouterOutlet,FooterComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app-master-detail';
  onGeneratePDF(){

  }
}
