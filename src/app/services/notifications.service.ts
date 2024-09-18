import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { AlertModel } from '../models/alert';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private notificationSource = new BehaviorSubject<AlertModel | null>(null);
  public notification$ = this.notificationSource.asObservable();

  // Update notification
  setNotifiction(alert: AlertModel) {
    this.notificationSource.next(alert);
  }
  
  // clear notification
  clearNotification() {
    this.notificationSource.next(null);
  }
 
  constructor() {}
}
