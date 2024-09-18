import { TestBed } from '@angular/core/testing';

import { NotificationsService } from './notifications.service';
import { AlertModel } from '../models/alert';
describe('NotificationsService', () => {
  let service: NotificationsService;
  const alertMock:AlertModel = {
    type: 'success',
    message: 'test'
  };
  
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a notification$', () => {
    expect(service.notification$).toBeTruthy();
  });

  it('should add and get a notification', () => {
    service.setNotifiction(alertMock);
    service.notification$.subscribe((alert) => {
      expect(alert).toEqual(alert);
    });
  });

});
