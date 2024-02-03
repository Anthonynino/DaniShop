import { TestBed } from "@angular/core/testing";
import { AlertService } from "./alert.service";

describe('AlertService', () => {
    let alertService: AlertService;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [AlertService],
      });
      alertService = TestBed.inject(AlertService);
    });
  
    it('should be created', () => {
      expect(alertService).toBeTruthy();
    })

    it('should emit an alert when showAlert is called', (done: DoneFn) => {
        const message = 'Muestra la alerta';
    
        alertService.alert$.subscribe((alert) => {
          expect(alert).toBe(message);
          done();
        });
    
        alertService.showAlert();
      });

      
})