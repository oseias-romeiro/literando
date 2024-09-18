import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

// components
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
// services
import { NotificationsService } from './services/notifications.service';
// models
import { AlertModel } from './models/alert';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, NgbAlertModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public alerts:AlertModel[] = [];
  
  constructor(private notificationService:NotificationsService) {
    // subscribe to new notifications
    this.notificationService.notification$.subscribe((alert)=>{
      if(alert) this.alerts.push(alert);
    });
  }

  // close alert
  close(alert: AlertModel) {
		this.alerts.splice(this.alerts.indexOf(alert), 1);
	}
}
